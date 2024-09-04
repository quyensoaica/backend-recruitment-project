import { Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import { StatusCodes } from "http-status-codes";
import { BaseRoute } from "./BaseRoute";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import AuthenticationMiddleware from "@/middlewares/AuthenticateMiddleware";

class AppRoute extends BaseRoute {
  private _authenticationMiddleware: AuthenticationMiddleware;

  constructor() {
    super();
    this.init();
    this._authenticationMiddleware = new AuthenticationMiddleware();
  }

  // router extends from BaseRoute
  private init() {
    this.router.all("*", (req: ExpressRequest, res: Response, next) => {
      this._authenticationMiddleware.authenticate(req, res, next);
    });
    this.router.use("/auth", AuthRoutes);
    this.router.use("/users", UserRoutes);

    this.router.get("/status", (req, res) => {
      res.status(StatusCodes.OK).json({
        message: "API is working fine!",
      });
    });
  }
}

export = new AppRoute().router;
