import { IsEmail } from "class-validator";
import { User } from "../../../../database/entities/User";

export default class StoreUserDTO {
  email: string;
  password: string;

  constructor(user: User) {
    this.email = user.email;
    this.password = user.password;
  }
}
