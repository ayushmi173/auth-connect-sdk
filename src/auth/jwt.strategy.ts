import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "./interface/auth.interface";
import { UnauthorizedException } from "@nestjs/common";
import { UserDto } from "src/user/dto/user.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
    });
  }

  async validate(payload: jwtPayload): Promise<UserDto> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException("User is not valid");
    }
    return user;
  }
}
