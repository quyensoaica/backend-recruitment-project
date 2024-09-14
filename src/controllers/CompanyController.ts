import ICompanyService from "@/interfaces/company/ICompanyService";
import { CompanyService } from "@/services/company/CompanyService";
import { Request, Response } from "express";

export class CompanyController {
  private _companyService: ICompanyService;
  constructor() {
    this._companyService = new CompanyService();
  }

  public async registerCompanyByRecruitment(req: Request, res: Response) {
    const userId = req.user.id;
    req.body.userId = userId;
    const response = await this._companyService.registerCompanyByRecruitment(req.body);
    return res.status(response.status).json(response);
  }

  public async getMyCompany(req: Request, res: Response) {
    const userId = req.user.id;
    const response = await this._companyService.getCompanyByUserId(userId);
    return res.status(response.status).json(response);
  }
  public async updateCompanyWhenRegister(req: Request, res: Response) {
    const response = await this._companyService.updateCompanyWhenRegister(req.body);
    return res.status(response.status).json(response);
  }
}
