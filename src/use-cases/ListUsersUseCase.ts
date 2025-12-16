import userRepository from "../repositories/UserRepository";
import { Op, FindOptions } from 'sequelize';

interface ListUserParams {
    query: {
        firstName?: string;
        lastName?: string;
        email?: string;
        minAge?: string; // Query params vêm como string do Express
        maxAge?: string;
    };
    page?: number;
    limit?: number;
    order?: string;
}

class ListUsersUseCase {
  async execute({ query, page = 1, limit = 5, order = "id:-1" }: ListUserParams) {
    const { firstName, lastName, minAge, maxAge, email } = query;
    const where: any = {}; // 'any' permite adicionar chaves dinamicamente

    // Montar filtros (Lógica de Negócio de Busca)
    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    
    if (minAge || maxAge) {
        where.age = {};
        if (minAge) where.age[Op.gte] = Number(minAge);
        if (maxAge) where.age[Op.lte] = Number(maxAge);
    }

    // Tratamento da ordenação (ex: "age:-1" ou "firstName:1")
    let [orderByField, orderDirection] = order.split(":");
    const direction = orderDirection === '-1' ? 'DESC' : 'ASC';

    // Montar opções de paginação
    const options: FindOptions = {
        where,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
        order: [[orderByField, direction]]
    };

    // Chamar Repositório
    const { count, rows } = await userRepository.findAll(options);

    // Retornar dados formatados em inglês
    return {
        data: rows,
        meta: {
            total: count,
            limit: Number(limit),
            page: Number(page),
            totalPages: Math.ceil(count / Number(limit))
        }
    };
  }
}

export default new ListUsersUseCase();