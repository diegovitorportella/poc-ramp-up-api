import userRepository from "../repositories/UserRepository.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class CreateUserUseCase {
  async execute(dados) {
    const usuarioExistente = await userRepository.findByEmail(dados.email);
    
    if (usuarioExistente) {
      throw new RequisicaoIncorreta("Este email já está em uso.");
    }

    const novoUsuario = await userRepository.create(dados);
    
    return novoUsuario;
  }
}

export default new CreateUserUseCase();