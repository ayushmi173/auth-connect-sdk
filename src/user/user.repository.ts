import { Repository, EntityRepository } from "typeorm";
import { User } from "./entity/user.entity";
import {
  AuthSignInCredentialDTO,
  AuthSignUpCredentialDTO,
} from "../auth/dto/auth-credential.dto";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger("UserRepository");

  async userSignUp(authSignUpDTO: AuthSignUpCredentialDTO): Promise<User> {
    const {
      username,
      password,
      fullname,
      age,
      email,
      contactNumber,
      address,
    } = authSignUpDTO;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.password = await this.buildHashPassword(password, salt);
    user.fullname = fullname;
    user.age = age;
    user.email = email;
    user.contactNumber = contactNumber;
    user.address = address;
    user.salt = salt;
    try {
      this.logger.log(`saved user ${JSON.stringify(user)}`);
      return await user.save();
    } catch (error) {
      if (error.code === "23505") {
        this.logger.verbose(`User Already Exist:  ${error}`);
        throw new ConflictException("User Already Exist");
      } else {
        this.logger.verbose(`User signup :  ${error}`);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateExistingUserPassword(
    authSignInDTO: AuthSignInCredentialDTO
  ): Promise<string> {
    const { username, password } = authSignInDTO;
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
