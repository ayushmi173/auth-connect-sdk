import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDTO } from "./dto/auth-credential.dto";
import { jwtAccessToken, jwtPayload } from "./interface/auth.interface";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  private logger = new Logger("AuthService");
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async userSignUp(authCredentialDTO: AuthCredentialDTO) {
    return await this.userRepository.userSignUp(authCredentialDTO);
  }

  async userSignIn(
    authCredentialDTO: AuthCredentialDTO
  ): Promise<jwtAccessToken> {
    const validUsername = await this.userRepository.validateExistingUserPassword(
      authCredentialDTO
    );
    if (validUsername) {
      const payload: jwtPayload = { username: validUsername };
      const accessTokenObj: jwtAccessToken = {
        accessToken: await this.jwtService.sign(payload),
      };
      this.logger.log(`generated token for ${JSON.stringify(payload)}`);
      return accessTokenObj;
    } else {
      this.logger.error(`username doesn't exist`);
      throw new UnauthorizedException(`Can't logged in, Wrong credentials`);
    }
  }
}
