import { User } from "src/user/entity/user.entity";

export interface JwtPayload {
  username: string;
}
export interface JwtSignInAccessTokenResponse {
  user: User;
  accessToken: string;
}
