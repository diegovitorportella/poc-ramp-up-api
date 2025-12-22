import User, { UserCreationAttributes } from "../models/User";
import { FindOptions } from 'sequelize';

class UserRepository {
  
  async create(userData: UserCreationAttributes): Promise<User> {
    return await User.create(userData);
  }

  async findAll(options: FindOptions): Promise<{ rows: User[]; count: number }> {
    return await User.findAndCountAll(options);
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async update(id: number, updatedData: Partial<UserCreationAttributes>): Promise<[affectedCount: number]> {
    return await User.update(updatedData, {
      where: { id: id }
    });
  }

  async delete(id: number): Promise<number> {
    return await User.destroy({
      where: { id: id }
    });
  }
}

export default new UserRepository();