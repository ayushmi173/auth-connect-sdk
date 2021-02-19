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
    accessToken: boolean;
    logout: boolean;
  };
  error: boolean;
};
