import userRepository from "../repositories/UserRepository";
import NotFoundError from "../errors/NotFoundError";
import { UserCreationAttributes } from "../models/User";

class UpdateUserUseCase {
  async execute(id: number, updatedData: Partial<UserCreationAttributes>) {
    // Verifica se existe antes de tentar atualizar
    const user = await userRepository.findById(id);
    
    if (!user) {
        throw new NotFoundError("User ID not found.");
    }

    // Atualiza
    await userRepository.update(id, updatedData);

    return { message: "User updated successfully" };
  }
}

export default new UpdateUserUseCase();