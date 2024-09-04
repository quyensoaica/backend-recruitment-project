export interface ICreateUserData {
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  groupRoleId: string;
}
export interface IUpdateUserData {
  email?: string;
  password?: string;
  fullName?: string;
  avatar?: string;
  groupRoleId?: string;
}
