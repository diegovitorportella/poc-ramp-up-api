import userRepository from "../../repositories/UserRepository";
import { Op, FindOptions } from 'sequelize';

interface ListUserParams {
    query: {
        firstName?: string;
        lastName?: string;
        email?: string;
        minAge?: string;
        maxAge?: string;
    };
    page?: number;
    limit?: number;
    order?: string;
}

class List {
  async execute({ query, page = 1, limit = 5, order = "id:-1" }: ListUserParams) {
    const { firstName, lastName, minAge, maxAge, email } = query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}; 

    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    
    if (minAge || maxAge) {
        where.age = {};
        if (minAge) where.age[Op.gte] = Number(minAge);
        if (maxAge) where.age[Op.lte] = Number(maxAge);
    }

    let [orderByField, orderDirection] = order.split(":");
    const direction = orderDirection === '-1' ? 'DESC' : 'ASC';

    const options: FindOptions = {
        where,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
        order: [[orderByField, direction]]
    };

    const { count, rows } = await userRepository.findAll(options);

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

export default new List();