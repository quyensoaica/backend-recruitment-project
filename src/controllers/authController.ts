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

    const setAccessTokenToCookie = (data: string) => {
      res.cookie("accessToken", data, {
        secure: true,
        sameSite: "none",
      });
    };

    const response = await this._authService.login(loginData, setAccessTokenToCookie);
    res.status(response.status).json(response);
  }

  async register(req: Request, res: Response) {
    const registerData: IUserRegisterData = req.body;
    const response = await this._authService.register(registerData);
    res.status(response.status).json(response);
  }

  async getMe(req: Request, res: Response) {
    const userId = req.user.id;
    const response = await this._authService.getMe(userId);
    res.status(response.status).json(response);
  }
}
