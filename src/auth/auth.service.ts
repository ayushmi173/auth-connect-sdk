import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import {
  AuthSignInCredentialDTO,
  AuthSignUpCredentialDTO,
} from "./dto/auth-credential.dto";
import {
  JwtPayload,
  JwtSignInAccessTokenResponse,
} from "./interface/auth.interface";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private logger: Logger
  ) {}

  async userSignUp(authSignUpDTO: AuthSignUpCredentialDTO) {
    return await this.userRepository.userSignUp(authSignUpDTO);
  }

  async userSignIn(
    authSignInDTO: AuthSignInCredentialDTO
  ): Promise<JwtSignInAccessTokenResponse> {
    const validUsername = await this.userRepository.validateExistingUserPassword(
      authSignInDTO
    );
    if (validUsername) {
      const payload: JwtPayload = { username: validUsername };
      const jwtAccessToken: string = this.jwtService.sign(payload);
      this.logger.log(
        `generated token for ${JSON.stringify(payload)}`,
        AuthService.name
      );
      return { username: payload.username, accessToken: jwtAccessToken };
    } else {
      this.logger.error(`username doesn't exist`, AuthService.name);
      throw new UnauthorizedException(`Can't logged in, Wrong credentials`);
    }
  }
}
