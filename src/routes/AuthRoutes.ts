import { Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import { BaseRoute } from "./BaseRoute";
import { AuthController } from "@/controllers/authController";

class AuthRoutes extends BaseRoute {
  private _authController: AuthController;

  constructor() {
    super();
    this._authController = new AuthController();
    this.init();
  }

  private init() {
    this.router.post("/register", (req: Request, res: Response) => {
      this._authController.register(req, res);
    });
    this.router.post("/login", (req: ExpressRequest, res: Response) => {
      this._authController.login(req, res);
    });
  }
}

export = new AuthRoutes().router;
