import { Repository, EntityRepository, DeepPartial } from "typeorm";
import { User } from "./entity/user.entity";
import { AuthSignInCredentialDTO } from "../auth/dto/auth-credential.dto";
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger("UserRepository");

  async createOne(authSignUpDTO: DeepPartial<User>): Promise<User> {
    const { username, password, email } = authSignUpDTO;
    const userCredential = {
      username: username,
      password: password,
      email: email,
    };

    try {
      this.logger.log(`saved user ${JSON.stringify(userCredential)}`);
      return await this.save(userCredential);
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

  async getUserByNameAndPassword(
    authSignInDTO: AuthSignInCredentialDTO
  ): Promise<User> {
    const { username, password } = authSignInDTO;
    const user = await this.findOne({
      where: { username: username, password: password },
    });

    if (user) return user;

    return null;
  }
}
