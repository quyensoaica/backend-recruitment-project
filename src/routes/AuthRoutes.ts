import { BaseRoute } from "./BaseRoute";

class AuthRoutes extends BaseRoute {
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.router.get("/login", async (req, res) => {
      res.send("Login Page");
    });
    this.router.get("/register", (req, res) => {
      res.send("Register Page");
    });
  }
}

export = new AuthRoutes().router;
