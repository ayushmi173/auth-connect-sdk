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

  async signUp(authSignUpDTO: AuthSignUpCredentialDTO) {
    return await this.userRepository.createOne(authSignUpDTO);
  }

  async signIn(
    authSignInDTO: AuthSignInCredentialDTO
  ): Promise<JwtSignInAccessTokenResponse> {
    const existingUser = await this.userRepository.getUserByNameAndPassword(
      authSignInDTO
    );
    if (existingUser) {
      const payload: JwtPayload = { username: existingUser.username };
      const jwtAccessToken: string = this.jwtService.sign(payload);
      this.logger.log(
        `generated token for ${JSON.stringify(payload)}`,
        AuthService.name
      );
      return { user: existingUser, accessToken: jwtAccessToken };
    } else {
      this.logger.error(`username doesn't exist`, AuthService.name);
      throw new UnauthorizedException(`Can't logged in, Wrong credentials`);
    }
  }
}
