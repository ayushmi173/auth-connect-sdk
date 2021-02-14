import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialDTO } from "./dto/auth-credential.dto";
import { User } from "../user/entity/user.entity";
import { GetUser } from "../user/getUser.decorator";
import { jwtAccessToken } from "./interface/auth.interface";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  userSignUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO
  ): Promise<User> {
    return this.authService.userSignUp(authCredentialDTO);
  }

  @Post("/signin")
  userSignIn(
    @Body() authCredentialDTO: AuthCredentialDTO
  ): Promise<jwtAccessToken> {
    return this.authService.userSignIn(authCredentialDTO);
  }

  @Post("/isvalid")
  @UseGuards(AuthGuard())
  isValid(@GetUser() user: User) {
    console.log(user.fullname);
    return user;
  }
}
