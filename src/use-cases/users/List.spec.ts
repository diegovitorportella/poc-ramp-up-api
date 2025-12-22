import List from './List';
import userRepository from '../../repositories/UserRepository';
import { Op } from 'sequelize';

jest.mock('../../repositories/UserRepository');

describe('List User Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list users with default parameters', async () => {
    const mockResponse = { count: 1, rows: [{ id: 1, firstName: 'Diego' }] };
    (userRepository.findAll as jest.Mock).mockResolvedValue(mockResponse);

    const result = await List.execute({ query: {} });

    // Verifica se chamou com paginação padrão e sem filtros
    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: {},
      limit: 5,
      offset: 0,
      order: [['id', 'DESC']]
    }));

    expect(result.meta).toEqual({
      total: 1,
      limit: 5,
      page: 1,
      totalPages: 1
    });
  });

  it('should apply filters correctly (name and age)', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

    await List.execute({
      query: {
        firstName: 'Diego',
        minAge: '18'
      },
      page: 2,
      limit: 10
    });

    // Verifica se os operadores do Sequelize foram montados
    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        firstName: { [Op.iLike]: '%Diego%' },
        age: { [Op.gte]: 18 }
      }),
      limit: 10,
      offset: 10 // (page 2 - 1) * limit 10 = 10
    }));
  });
});