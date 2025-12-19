import userRepository from "../../repositories/UserRepository";
import NotFoundError from "../../errors/NotFoundError";

class GetById {
  async execute(id: number) {
    const user = await userRepository.findById(id);
    
    if (!user) {
        throw new NotFoundError("User ID not found.");
    }
    
    return user;
  }
}

export default new GetById();