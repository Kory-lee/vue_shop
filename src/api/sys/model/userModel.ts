export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
/**
 *@description Get User information return value
 */
export interface GetUserInfoByUserIdModel {
  roles: RoleInfo[];
  userId: string | number;
  username: string;
  realName: string;
  // 介绍
  desc?: string;
}
