import bcrypt from "bcrypt";
import { IUserLoginData, IUserLoginResponse, IUserRegisterData } from "@/interfaces/auth/AuthDto";
import IAuthService from "@/interfaces/auth/IAuthService";
import { IResponseBase } from "@/interfaces/base/IResponseBase";
import { Repo } from "@/repository";
import { ENV } from "@/constants/env";
import { StatusCodes } from "http-status-codes";
import { IAccessTokenPayload, IJWTService } from "@/interfaces/auth/IJWTService";
import JwtService from "./JWTService";
import IRoleService from "@/interfaces/auth/IRoleService";
import RoleService from "./RoleService";
import { v4 as uuidv4 } from "uuid";
import EGroupRole from "@/constants/GroupRole";

export default class AuthService implements IAuthService {
  private _JwtService!: IJWTService;
  private _RoleService!: IRoleService;
  constructor() {
    this._JwtService = new JwtService();
    this._RoleService = new RoleService();
  }
  private hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(Number(ENV.PASSWORD_SALT));
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  private async comparePassword(plaintextPassword: string, hashPassword: string): Promise<boolean> {
    const checkPassword = bcrypt.compareSync(plaintextPassword, hashPassword);
    return checkPassword;
  }

  async getUserByEmail(email: string): Promise<IResponseBase> {
    try {
      if (!email) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "Email is required",
          data: null,
          error: {
            message: "Bad Request",
            errorDetail: "Email is required",
          },
        };
      }
      const user = await Repo.UserRepo.findOne({
        where: {
          email,
        },
        relations: ["groupRole"],
      });
      return {
        status: StatusCodes.OK,
        success: true,
        data: user,
        error: null,
      };
    } catch {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: "Internal Server Error",
        data: null,
        error: {
          message: "Internal Server Error",
          errorDetail: "Internal Server Error",
        },
      };
    }
  }

  async login(userLogin: IUserLoginData, setAccessTokenToCookie: (data: string) => void): Promise<IResponseBase> {
    try {
      if (!userLogin.email || !userLogin.password) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "Email and Password is required",
          data: null,
          error: {
            message: "Bad Request",
            errorDetail: "Email and Password is required",
          },
        };
      }
      const user = await this.getUserByEmail(userLogin.email);
      if (!user.success || user.data === null) {
        return {
          status: StatusCodes.NOT_FOUND,
          success: false,
          errorMessage: "Tài khoản của bạn không tồn tại trên hệ thống",
          data: null,
          error: {
            message: "Not Found",
            errorDetail: "Tài khoản của bạn không tồn tại trên hệ thống",
          },
        };
      }
      const checkPass = await this.comparePassword(userLogin.password, user.data.password);
      if (!checkPass) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          success: false,
          errorMessage: "Mật khẩu không chính xác",
          data: null,
          error: {
            message: "Unauthorized",
            errorDetail: "Mật khẩu không chính xác",
          },
        };
      }
      const userRoles = await this._RoleService.getCurrentUserPermission(user.data.groupRoleId);

      if (!userRoles.success) {
        return userRoles;
      }

      const tokenPayload: IAccessTokenPayload = {
        userId: user.data.id,
        email: user.data.email,
        role: userRoles.data,
        roleName: user.data.groupRole.name,
      };

      const token = this._JwtService.generateAccessToken(tokenPayload);
      setAccessTokenToCookie(token.token);
      const loginData: IUserLoginResponse = {
        accessToken: token,
        userInfo: {
          userId: user.data.id,
          email: user.data.email,
          fullName: user.data.fullName,
          role: {
            roleName: user.data.groupRole.name,
            displayName: user.data.groupRole.displayName,
          },
        },
        permissions: userRoles.data,
      };

      return {
        status: 200,
        success: true,
        data: loginData,
        error: null,
      };
    } catch {
      return {
        status: 500,
        success: false,
        errorMessage: "Internal Server Error",
        data: null,
        error: {
          message: "Internal Server Error",
          errorDetail: "Internal Server Error",
        },
      };
    }
  }

  async register(userRegister: IUserRegisterData): Promise<IResponseBase> {
    try {
      if (!userRegister.email || !userRegister.password || !userRegister.fullName) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "Email, password and fullName is required",
          data: null,
          error: {
            message: "Bad Request",
            errorDetail: "Email, password and fullName is required",
          },
        };
      }

      const checkEmailExist = await this.getUserByEmail(userRegister.email);
      if (checkEmailExist.success && checkEmailExist.data) {
        return {
          status: StatusCodes.CONFLICT,
          success: false,
          errorMessage: "Email đã tồn tại trên hệ thống",
          data: null,
          error: {
            message: "Conflict",
            errorDetail: "Email đã tồn tại trên hệ thống",
          },
        };
      }

      const checkRole = await this._RoleService.getGroupRole(EGroupRole.CANDIDATE);
      if (!checkRole.success || !checkRole.data) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "Đăng kí tài khoản không thành công",
          data: null,
          error: {
            message: "Phân quyền không tồn tại",
            errorDetail: "Phân quyền bạn chọn không tồn tại trên hệ thống",
          },
        };
      }

      const hashPassword = this.hashPassword(userRegister.password);

      const registerData = {
        id: uuidv4(),
        email: userRegister.email,
        password: hashPassword,
        fullName: userRegister.fullName,
        groupRoleId: EGroupRole.CANDIDATE,
      };

      const newUser = await Repo.UserRepo.save(registerData);

      if (!newUser) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          success: false,
          errorMessage: "Đăng kí tài khoản không thành công, vui lòng kiểm tra lại",
          data: null,
          error: {
            message: "Đăng kí tài khoản thất bại",
            errorDetail: "Đăng kí tài khoản không thành công, vui lòng kiểm tra lại",
          },
        };
      }

      return {
        status: StatusCodes.CREATED,
        success: true,
        data: {
          email: newUser.email,
          fullName: newUser.fullName,
          id: newUser.id,
          role: newUser.groupRole,
        },
        error: null,
      };
    } catch {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: "Internal Server Error",
        data: null,
        error: {
          message: "Internal Server Error",
          errorDetail: "Internal Server Error",
        },
      };
    }
  }

  async getMe(userId: string): Promise<IResponseBase> {
    if (!userId) {
      return {
        status: StatusCodes.BAD_REQUEST,
        success: false,
        errorMessage: "User Id is required",
        data: null,
        error: {
          message: "Bad Request",
          errorDetail: "User Id is required",
        },
      };
    }
    try {
      const user = await Repo.UserRepo.createQueryBuilder("user")
        .innerJoin("user.groupRole", "groupRole")
        .where("user.id = :userId", { userId })
        .select(["user.id", "user.email", "user.avatar", "user.isBlocked", "user.fullName", "groupRole.name", "groupRole.displayName"])
        .getOne();
      if (!user) {
        return {
          status: StatusCodes.NOT_FOUND,
          success: false,
          errorMessage: "Không tìm thấy thông tin người dùng",
          data: null,
          error: {
            message: "User not found",
            errorDetail: "User not found",
          },
        };
      }
      return {
        status: StatusCodes.OK,
        success: true,
        data: user,
        error: null,
      };
    } catch {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: "Internal Server Error",
        data: null,
        error: {
          message: "Internal Server Error",
          errorDetail: "Internal Server Error",
        },
      };
    }
  }
}
