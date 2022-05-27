import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userExists = this.usersRepository.findByEmail(email);
    if (userExists) throw new Error("This email is already in use");
    const user = this.usersRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
