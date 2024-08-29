import { BaseRoute } from "./BaseRoute";

class AccountRoutes extends BaseRoute {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.router.get("/", (req, res) => {
      res.send("List of users");
    });
    this.router.get("/user/:id", (req, res) => {
      res.send(`User with id ${req.params.id}`);
    });
  }
}

export = new AccountRoutes().router;
