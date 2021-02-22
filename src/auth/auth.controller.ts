import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
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
  signUp(@Body() authSignUpDTO: AuthSignUpCredentialDTO): Promise<User> {
    return this.authService.signUp(authSignUpDTO);
  }

  @Post("/signin")
  signIn(
    @Body() authSignInDTO: AuthSignInCredentialDTO
  ): Promise<JwtSignInAccessTokenResponse> {
    return this.authService.signIn(authSignInDTO);
  }

  @Get("/me")
  @UseGuards(AuthGuard())
  isUser(@GetUser() user: User): UserDto {
    return user;
  }
}
