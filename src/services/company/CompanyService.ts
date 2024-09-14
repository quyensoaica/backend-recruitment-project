import { ErrorMessages } from "@/constants/ErrorMessages";
import { Company } from "@/entity/Company";
import { IResponseBase } from "@/interfaces/base/IResponseBase";
import { IRegisterCompanyDTO } from "@/interfaces/company/ICompanyDTO";
import ICompanyService from "@/interfaces/company/ICompanyService";
import { Repo } from "@/repository";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

export class CompanyService implements ICompanyService {
  constructor() {}
  public async getAllCompany(): Promise<IResponseBase> {
    throw new Error("Method not implemented.");
  }
  public async getCompanyById(companyId: string): Promise<IResponseBase> {
    try {
      if (!companyId) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "CompanyId is required",
          data: null,
          error: {
            message: "CompanyId is required",
            errorDetail: "CompanyId is required",
          },
        };
      }
      const company = await Repo.CompanyRepo.createQueryBuilder("company")
        .innerJoinAndSelect("company.user", "recruiter")
        .innerJoinAndSelect("company.memberCount", "memberCount")
        .innerJoinAndSelect("company.province", "province")
        .where("company.id = :companyId", { companyId })
        .select([
          "company",
          "recruiter.id",
          "recruiter.email",
          "recruiter.fullName",
          "recruiter.avatar",
          "recruiter.groupRoleId",
          "memberCount.id",
          "memberCount.displayName",
          "province.id",
          "province.provinceName",
        ])
        .getOne();
      if (!company) {
        return {
          status: StatusCodes.NOT_FOUND,
          success: false,
          errorMessage: "Không tìm thấy thông tin công ty",
          data: null,
          error: {
            message: "Không tìm thấy thông tin công ty",
            errorDetail: "Không tìm thấy thông tin công ty",
          },
        };
      }
      return {
        status: StatusCodes.OK,
        success: true,
        errorMessage: null,
        data: company,
        error: null,
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
        data: null,
        error: {
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          errorDetail: error.message,
        },
      };
    }
  }
  public async getCompanyByUserId(userId: string): Promise<IResponseBase> {
    try {
      if (!userId) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "UserId is required",
          data: null,
          error: {
            message: "UserId is required",
            errorDetail: "UserId is required",
          },
        };
      }
      const company = await Repo.CompanyRepo.createQueryBuilder("company")
        .innerJoinAndSelect("company.user", "recruiter")
        .innerJoinAndSelect("company.memberCount", "memberCount")
        .innerJoinAndSelect("company.province", "province")
        .where("company.recruiterId = :userId", { userId })
        .select([
          "company",
          "recruiter.id",
          "recruiter.email",
          "recruiter.fullName",
          "recruiter.avatar",
          "recruiter.groupRoleId",
          "memberCount.id",
          "memberCount.displayName",
          "province.id",
          "province.provinceName",
        ])
        .getOne();
      if (!company) {
        return {
          status: StatusCodes.NOT_FOUND,
          success: false,
          errorMessage: "Không tìm thấy thông tin công ty",
          data: null,
          error: {
            message: "Không tìm thấy thông tin công ty",
            errorDetail: "Không tìm thấy thông tin công ty",
          },
        };
      }
      return {
        status: StatusCodes.OK,
        success: true,
        errorMessage: null,
        data: company,
        error: null,
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
        data: null,
        error: {
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          errorDetail: error.message,
        },
      };
    }
  }
  public async registerCompanyByRecruitment(data: IRegisterCompanyDTO): Promise<IResponseBase> {
    try {
      if (!data.userId) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "UserId is required",
          data: null,
          error: {
            message: "UserId is required",
            errorDetail: "userId is required",
          },
        };
      }

      // check if provinceId is valid
      // check if memberCountId is valid
      // check if recruiterId is valid
      // check if recruiter already registered company
      const checkUserRegistered = await this.getCompanyByUserId(data.userId);
      if (checkUserRegistered.success || checkUserRegistered.data !== null) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "Người dùng đã đăng ký thông tin công ty",
          data: null,
          error: {
            message: "Người dùng đã đăng ký thông tin công ty",
            errorDetail: "Người dùng đã đăng ký thông tin công ty",
          },
        };
      }

      // add company and save to database
      const company = new Company();
      company.companyName = data.companyName;
      company.taxCode = data.taxCode;
      company.companyWebsite = data.companyWebsite;
      company.companyEmail = data.companyEmail;
      company.phoneNumber = data.phoneNumber;
      company.provinceId = data.provinceId;
      company.companyAddress = data.companyAddress;
      company.companyIntroduce = data.companyIntroduce;
      company.companyLogo = data.companyLogo;
      company.companyBanner = data.companyBanner;
      company.recruiterId = data.userId;
      company.memberCountId = data.memberCountId;
      company.id = uuidv4();

      const companyRepo = Repo.CompanyRepo.create(company);
      const result = await Repo.CompanyRepo.save(companyRepo);

      if (!result) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          success: false,
          errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
          data: null,
          error: {
            message: ErrorMessages.INTERNAL_SERVER_ERROR,
            errorDetail: ErrorMessages.INTERNAL_SERVER_ERROR,
          },
        };
      }

      return {
        status: StatusCodes.CREATED,
        success: true,
        errorMessage: null,
        data: result,
        error: null,
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
        data: null,
        error: {
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          errorDetail: error.message,
        },
      };
    }
  }
  public async updateCompanyWhenRegister(data: IRegisterCompanyDTO): Promise<IResponseBase> {
    try {
      if (!data.id) {
        return {
          status: StatusCodes.BAD_REQUEST,
          success: false,
          errorMessage: "CompanyId is required",
          data: null,
          error: {
            message: "CompanyId is required",
            errorDetail: "CompanyId is required",
          },
        };
      }
      const companyResponse = await this.getCompanyById(data.id);

      if (!companyResponse || !companyResponse.success || companyResponse.data === null) {
        return {
          status: StatusCodes.NOT_FOUND,
          success: false,
          errorMessage: "Không tìm thấy thông tin công ty",
          data: null,
          error: {
            message: "Không tìm thấy thông tin công ty",
            errorDetail: "Không tìm thấy thông tin công ty",
          },
        };
      }
      const company = companyResponse.data;

      company.companyName = data.companyName;
      company.taxCode = data.taxCode;
      company.companyWebsite = data.companyWebsite;
      company.companyEmail = data.companyEmail;
      company.phoneNumber = data.phoneNumber;
      company.provinceId = data.provinceId;
      company.companyAddress = data.companyAddress;
      company.companyIntroduce = data.companyIntroduce;
      company.companyLogo = data.companyLogo;
      company.companyBanner = data.companyBanner;
      company.memberCountId = data.memberCountId;
      company.status = 0;
      company.feedbackFromManager = null;

      const result = await Repo.CompanyRepo.update(company.id, company);
      if (!result) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          success: false,
          errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
          data: null,
          error: {
            message: ErrorMessages.INTERNAL_SERVER_ERROR,
            errorDetail: ErrorMessages.INTERNAL_SERVER_ERROR,
          },
        };
      }

      return {
        status: StatusCodes.OK,
        success: true,
        errorMessage: null,
        data: company,
        error: null,
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        errorMessage: ErrorMessages.INTERNAL_SERVER_ERROR,
        data: null,
        error: {
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          errorDetail: error.message,
        },
      };
    }
  }
}
