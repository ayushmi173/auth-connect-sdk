export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
}

export interface IGetUser {
  user: IUser;
  accessToken: string;
}

export type InitialEntityState = {
  user: IUser;
  entities: {
    login: boolean;
    logout: boolean;
  };
  error: boolean;
};
