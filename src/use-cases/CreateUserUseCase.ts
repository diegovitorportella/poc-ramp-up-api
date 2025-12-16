import userRepository from "../repositories/UserRepository";
import BadRequestError from "../errors/BadRequestError";
import { UserCreationAttributes } from "../models/User";

class CreateUserUseCase {
  async execute(data: UserCreationAttributes) {
    const userExists = await userRepository.findByEmail(data.email);
    
    if (userExists) {
      throw new BadRequestError("Email already in use.");
    }

    const newUser = await userRepository.create(data);
    
    return newUser;
  }
}

export default new CreateUserUseCase();