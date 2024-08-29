import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import { Server } from "./server";
import { asyncLocalStorageMiddleware } from "./middlewares";
import { Securities } from "./constants/Securities";
import { ENV } from "./constants/env";
import AppRoute from "./routes";

class Application {
  server!: Server;
  serverInstance: any;
  init() {
    this.initServer();
  }

  private initServer() {
    this.server = new Server();
  }
  start() {
    ((port = ENV.APP_PORT || 5001) => {
      this.server.app.use(
        cors({
          origin: [ENV.APP_ORIGIN || "http://localhost:3000" || "http://localhost:3001" || "http://localhost:3002"],
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
        })
      );

      this.server.app.use(cookieParser());
      this.server.app.use(bodyParser.json());
      this.server.app.use(bodyParser.urlencoded({ extended: true }));

      this.server.app.use(Securities.MEDIA_PATH, express.static(path.join(__dirname, "./../uploads")));
      this.server.app.use(express.static(path.join(path.resolve(), "public")));

      this.server.app.use("/api", AppRoute);

      this.server.app.use(asyncLocalStorageMiddleware());

      this.serverInstance = this.server.app.listen(port, () => console.log(`==> Listening on port ${port} with domain 🚀🚀 http://localhost:${port}  🚀🚀`));
    })();
  }
  close() {
    this.serverInstance.close();
  }
}
export default Application;
