export interface IUserLoginData {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export interface IUserRegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface IUserLoginResponse {
  email: string;
  fullName: string;
  token: string;
  refreshToken: string;
  isRememberMe: boolean;
}

export interface IUserRegisterResponse {
  email: string;
  fullName: string;
}
