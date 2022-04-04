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
  avatar: string;
  // 介绍
  desc?: string;
}

export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}


export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
