import { Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import { AuthController } from "@/controllers/AuthController";
import { BaseRoute } from "./BaseRoute";

class AuthRoutes extends BaseRoute {
  private _authController: AuthController;

  constructor() {
    super();
    this._authController = new AuthController();
    this.init();
  }

  private init() {
    this.router.get("/register", (req: Request, res: Response) => {
      res.send("Register Page");
    });
    this.router.post("/login", (req: ExpressRequest, res: Response) => {
      this._authController.login(req, res);
    });
  }
}

export = new AuthRoutes().router;
