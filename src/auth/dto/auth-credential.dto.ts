import { IsString } from "class-validator";

export class AuthSignUpCredentialDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  email: string;
}

export class AuthSignInCredentialDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
