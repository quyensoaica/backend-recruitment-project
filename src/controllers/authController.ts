import { Request, Response } from "express";
import { IUserLoginData, IUserRegisterData } from "@/interfaces/auth/AuthDto";
import IAuthService from "@/interfaces/auth/IAuthService";
import { IResponseBase } from "@/interfaces/base/IResponseBase";
import AuthService from "@/services/auth/AuthServices";

export class AuthController {
  private _authService: IAuthService;

  constructor() {
    this._authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    const loginData: IUserLoginData = req.body;
    try {
      const response = await this._authService.login(loginData);
      res.status(response.status).json(response);
    } catch (error: any) {
      const customError: IResponseBase = {
        status: 500,
        success: false,
        errorMessage: "Internal Server Error",
        data: null,
        error: {
          message: error.message,
          errorDetail: error.stack,
        },
      };
      res.status(500).json(customError);
    }
  }

  async register(req: Request, res: Response) {
    const registerData: IUserRegisterData = req.body;
    const response = await this._authService.register(registerData);
    res.status(response.status).json(response);
  }
}
