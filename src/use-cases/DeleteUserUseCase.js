import userRepository from "../repositories/UserRepository.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class DeleteUserUseCase {
  async execute(id) {
    const linhasDeletadas = await userRepository.delete(id);

    if (linhasDeletadas === 0) {
        throw new NaoEncontrado("Id do Autor não localizado.");
    }
    
    return { message: "Usuário excluído" };
  }
}

export default new DeleteUserUseCase();