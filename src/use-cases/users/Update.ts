import userRepository from "../../repositories/UserRepository";
import NotFoundError from "../../errors/NotFoundError";
import { UserCreationAttributes } from "../../models/User";

class Update {
  async execute(id: number, updatedData: Partial<UserCreationAttributes>) {
    const user = await userRepository.findById(id);
    
    if (!user) {
        throw new NotFoundError("User ID not found.");
    }

    await userRepository.update(id, updatedData);

    return { message: "User updated successfully" };
  }
}

export default new Update();