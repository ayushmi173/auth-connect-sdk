import { Repository, EntityRepository } from "typeorm";
import { User } from "./entity/user.entity";
import { AuthCredentialDTO } from "../auth/dto/auth-credential.dto";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { use } from "passport";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger("UserRepository");
  async userSignUp(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    const {
      username,
      password,
      age,
      address,
      fullname,
      contactNumber,
      email,
    } = authCredentialDTO;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.password = await this.buildHashPassword(password, salt);
    user.age = age;
    user.fullname = fullname;
    user.address = address;
    user.contactNumber = contactNumber;
    user.email = email;
    user.salt = salt;
    try {
      this.logger.log(`saved user ${JSON.stringify(user)}`);
      return await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username Already Exist");
      } else {
        this.logger.verbose("before saving user");
        throw new InternalServerErrorException();
      }
    }
  }

  async validateExistingUserPassword(
    authCredentialDTO: AuthCredentialDTO
  ): Promise<string> {
    const { username, password } = authCredentialDTO;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async buildHashPassword(
    password: string,
    salt: string
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
