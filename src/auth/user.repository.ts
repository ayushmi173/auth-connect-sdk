import { Repository, EntityRepository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthCredentialDTO } from './dto/auth-credential.dto'
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async userSignUp(authCredentialDTO: AuthCredentialDTO): Promise<User> {
        const { username, password } = authCredentialDTO;

        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.password = await this.buildHashPassword(password, salt);
        user.salt = salt;
        try {
            return await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username Already Exist')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async buildHashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
