import Usuario from "../models/user.js";

class UserRepository {
  
  async create(dadosUsuario) {
    return await Usuario.create(dadosUsuario);
  }

  async findAll(filtros) {
    return await Usuario.findAndCountAll(filtros);
  }

  async findById(id) {
    return await Usuario.findByPk(id);
  }

  async findByEmail(email) {
    return await Usuario.findOne({ where: { email } });
  }

  async update(id, dadosAtualizados) {
    return await Usuario.update(dadosAtualizados, {
      where: { id: id }
    });
  }

  async delete(id) {
    return await Usuario.destroy({
      where: { id: id }
    });
  }
}

export default new UserRepository();