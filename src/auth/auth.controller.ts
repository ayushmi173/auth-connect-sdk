import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import {
  AuthSignInCredentialDTO,
  AuthSignUpCredentialDTO,
} from "./dto/auth-credential.dto";
import { User } from "../user/entity/user.entity";
import { GetUser } from "../user/getUser.decorator";
import { JwtSignInAccessTokenResponse } from "./interface/auth.interface";
import { UserDto } from "src/user/dto/user.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  userSignUp(
    @Body(ValidationPipe) authSignUpDTO: AuthSignUpCredentialDTO
  ): Promise<User> {
    return this.authService.userSignUp(authSignUpDTO);
  }

  @Post("/signin")
  userSignIn(
    @Body() authSignInDTO: AuthSignInCredentialDTO
  ): Promise<JwtSignInAccessTokenResponse> {
    return this.authService.userSignIn(authSignInDTO);
  }

  @Get("/profile")
  @UseGuards(AuthGuard())
  isValid(@GetUser() user: User): UserDto {
    return user;
  }
}
