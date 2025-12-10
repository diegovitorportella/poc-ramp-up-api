import userRepository from "../repositories/UserRepository.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class UpdateUserUseCase {
  async execute(id, dadosAtualizados) {
    // Verifica se existe antes de tentar atualizar
    const usuario = await userRepository.findById(id);
    
    if (!usuario) {
        throw new NaoEncontrado("Id do Autor não localizado.");
    }

    // Atualiza
    await userRepository.update(id, dadosAtualizados);

    return { message: "Usuário atualizado com sucesso" };
  }
}

export default new UpdateUserUseCase();