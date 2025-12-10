import userRepository from "../repositories/UserRepository.js";
import { Op } from 'sequelize';

class ListUsersUseCase {
  async execute({ query, page = 1, limit = 5, order = "id:-1" }) {
    const { firstName, lastName, minAge, maxAge, email } = query;
    const where = {};

    // Montar filtros (Lógica de Negócio de Busca)
    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    
    if (minAge || maxAge) {
        where.age = {};
        if (minAge) where.age[Op.gte] = minAge;
        if (maxAge) where.age[Op.lte] = maxAge;
    }

    // Tratamento da ordenação
    let [campoOrdenacao, ordem] = order.split(":");
    ordem = ordem === '-1' ? 'DESC' : 'ASC';

    // Montar opções de paginação
    const options = {
        where,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
        order: [[campoOrdenacao, ordem]]
    };

    // Chamar Repositório
    const { count, rows } = await userRepository.findAll(options);

    // Retornar dados formatados
    return {
        data: rows,
        meta: {
            total: count,
            limite: Number(limit),
            pagina: Number(page),
            totalPages: Math.ceil(count / Number(limit))
        }
    };
  }
}

export default new ListUsersUseCase();