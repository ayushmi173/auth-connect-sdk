import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "./interface/auth.interface";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "../user/entity/user.entity";

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

  async validate(payload: jwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException("User is not valid");
    }
    return user;
  }
}
