import { Response } from "express";
import { Request as ExpressRequest } from "express";
import { BaseRoute } from "./BaseRoute";
import { CompanyController } from "@/controllers/CompanyController";

class CompanyRoutes extends BaseRoute {
  private _companyController: CompanyController;

  constructor() {
    super();
    this._companyController = new CompanyController();
    this.init();
  }

  private init() {
    this.router.post("/register-company-by-recruiter", (req: ExpressRequest, res: Response) => {
      this._companyController.registerCompanyByRecruitment(req, res);
    });
    this.router.get("/my-company", (req: ExpressRequest, res: Response) => {
      this._companyController.getMyCompany(req, res);
    });
    this.router.put("/update-company-when-register", (req: ExpressRequest, res: Response) => {
      this._companyController.updateCompanyWhenRegister(req, res);
    });
  }
}

export = new CompanyRoutes().router;
