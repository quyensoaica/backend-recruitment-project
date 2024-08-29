import { StatusCodes } from "http-status-codes";
import { BaseRoute } from "./BaseRoute";
import AuthRoutes from "./AuthRoutes";
import AccountRoutes from "./AccountRoutes";

class AppRoute extends BaseRoute {
  constructor() {
    super();
    this.init();
  }

  // router extends from BaseRoute
  private init() {
    this.router.use("/auth", AuthRoutes);
    this.router.use("/users", AccountRoutes);

    this.router.get("/status", (req, res) => {
      res.status(StatusCodes.OK).json({
        message: "API is working fine!",
      });
    });
  }
}

export = new AppRoute().router;
