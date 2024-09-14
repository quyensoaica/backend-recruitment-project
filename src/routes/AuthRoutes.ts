import { Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import { BaseRoute } from "./BaseRoute";
import { AuthController } from "@/controllers/authController";
import AuthenticationMiddleware from "@/middlewares/AuthenticateMiddleware";

class AuthRoutes extends BaseRoute {
  private _authController: AuthController;
  private _authenticationMiddleware: AuthenticationMiddleware;

  constructor() {
    super();
    this._authController = new AuthController();
    this._authenticationMiddleware = new AuthenticationMiddleware();
    this.init();
  }

  private init() {
    this.router.post("/register", (req: Request, res: Response) => {
      this._authController.register(req, res);
    });
    this.router.post("/login", (req: ExpressRequest, res: Response) => {
      this._authController.login(req, res);
    });
    this.router.get(
      "/get-me",
      (req: ExpressRequest, res: Response, next) => {
        this._authenticationMiddleware.authenticate(req, res, next);
      },
      (req: ExpressRequest, res: Response) => {
        this._authController.getMe(req, res);
      }
    );
    this.router.get("/get-group-roles", (req: ExpressRequest, res: Response) => {
      this._authController.getAllGroupRoles(req, res);
    });
  }
}

export = new AuthRoutes().router;
