import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import { User } from "../../../../database/entities/User";

export default class UpdateUserDTO {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.updatedAt = new Date();
  }
}
