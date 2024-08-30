import { IResponseBase } from "../base/IResponseBase";
import { IUserLoginData, IUserLoginResponse, IUserRegisterData, IUserRegisterResponse } from "./AuthDto";

export default interface IAuthService {
  login(userLogin: IUserLoginData): Promise<IResponseBase>;
  register(userRegister: IUserRegisterData): Promise<IResponseBase>;
  // register(email: string, password: string): Promise<string>;
  // logout(): Promise<string>;
  // verifyEmail(token: string): Promise<string>;
  // forgotPassword(email: string): Promise<string>;
  // resetPassword(token: string, password: string): Promise<string>;
  // changePassword(oldPassword: string, newPassword: string): Promise<string>;
  // changeEmail(email: string): Promise<string>;
  // changeUsername(username: string): Promise<string>;
  // changeProfilePicture(picture: string): Promise<string>;
  // changeProfileBanner(banner: string): Promise<string>;
  // changeProfileDescription(description: string): Promise<string>;
  // changeProfileLocation(location: string): Promise<string>;
  // changeProfileWebsite(website: string): Promise<string>;
  // changeProfileBirthday(birthday: string): Promise<string>;
  // changeProfileGender
}
