import userRepository from "../repositories/UserRepository.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class GetUserByIdUseCase {
  async execute(id) {
    const usuario = await userRepository.findById(id);
    
    if (!usuario) {
        throw new NaoEncontrado("ID do usuário não localizado");
    }
    
    return usuario;
  }
}

export default new GetUserByIdUseCase();