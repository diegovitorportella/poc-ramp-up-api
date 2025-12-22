import List from './List';
import userRepository from '../../repositories/UserRepository';
import { Op } from 'sequelize';

jest.mock('../../repositories/UserRepository');

describe('List User Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list users with default parameters', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });
    
    await List.execute({ query: {} });

    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: {},
      limit: 5,
      offset: 0,
      order: [['id', 'DESC']]
    }));
  });

  it('should apply simple string filters (firstName, lastName, email)', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

    await List.execute({
      query: {
        firstName: 'Diego',
        lastName: 'Portella',
        email: 'teste@teste.com'
      }
    });

    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        firstName: { [Op.iLike]: '%Diego%' },
        lastName: { [Op.iLike]: '%Portella%' },
        email: { [Op.iLike]: '%teste@teste.com%' }
      })
    }));
  });

  it('should apply ONLY minAge filter', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

    await List.execute({ query: { minAge: '18' } });

    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        age: { [Op.gte]: 18 }
      })
    }));
  });

  it('should apply ONLY maxAge filter', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

    await List.execute({ query: { maxAge: '30' } });

    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        age: { [Op.lte]: 30 }
      })
    }));
  });

  it('should apply custom order (ASC)', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

    await List.execute({ query: {}, order: 'age:1' });

    expect(userRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
      order: [['age', 'ASC']]
    }));
  });
});