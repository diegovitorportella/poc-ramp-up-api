import userRepository from "../repositories/UserRepository";
import NotFoundError from "../errors/NotFoundError";

class DeleteUserUseCase {
  async execute(id: number) {
    const rowsDeleted = await userRepository.delete(id);

    if (rowsDeleted === 0) {
        throw new NotFoundError("User ID not found.");
    }
    
    return { message: "User deleted successfully" };
  }
}

export default new DeleteUserUseCase();