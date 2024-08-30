import { IUserLoginData, IUserRegisterData } from "@/interfaces/auth/AuthDto";
import IAuthService from "@/interfaces/auth/IAuthService";
import { IResponseBase } from "@/interfaces/base/IResponseBase";

export default class AuthService implements IAuthService {
  constructor() {}
  async login(userLogin: IUserLoginData): Promise<IResponseBase> {
    try {
      console.log("Connection has been established successfully.");
      // const user = await Education.findAll();
      return {
        status: 200,
        success: true,
        data: {
          email: "test",
        },
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

  register(userRegister: IUserRegisterData): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
