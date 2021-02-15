import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import {
  AuthSignInCredentialDTO,
  AuthSignUpCredentialDTO,
} from "./dto/auth-credential.dto";
import {
  jwtPayload,
  jwtSignInAccessTokenResponse,
} from "./interface/auth.interface";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  private logger = new Logger("AuthService");
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async userSignUp(authSignUpDTO: AuthSignUpCredentialDTO) {
    return await this.userRepository.userSignUp(authSignUpDTO);
  }

  async userSignIn(
    authSignInDTO: AuthSignInCredentialDTO
  ): Promise<jwtSignInAccessTokenResponse> {
    const validUsername = await this.userRepository.validateExistingUserPassword(
      authSignInDTO
    );
    if (validUsername) {
      const payload: jwtPayload = { username: validUsername };
      const jwtAccessToken: string = this.jwtService.sign(payload);
      this.logger.log(`generated token for ${JSON.stringify(payload)}`);
      return { username: payload.username, accessToken: jwtAccessToken };
    } else {
      this.logger.error(`username doesn't exist`);
      throw new UnauthorizedException(`Can't logged in, Wrong credentials`);
    }
  }
}
