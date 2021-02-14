import { IsString } from "class-validator";

export class AuthCredentialDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}