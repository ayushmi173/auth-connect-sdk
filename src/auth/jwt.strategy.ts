import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interface/auth.interface";
import { UnauthorizedException } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
import * as dotenv from "dotenv";

dotenv.config();
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException("User is not valid");
    }
    return user;
  }
}
