import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { IsEmail, IsNumber, IsString } from "class-validator";
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
  @IsString()
  fullname: string;

  @Column()
  @IsNumber()
  age: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  contactNumber: number;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  salt: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return this.password === hash;
  }
}
