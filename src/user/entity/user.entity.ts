import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { buildHashPassword } from "../shared/hashPassword";
import { IsEmail, IsString } from "class-validator";
@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  salt: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await buildHashPassword(password, this.salt);
    return this.password === hash;
  }
}
