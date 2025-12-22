import GetById from './GetById';
import userRepository from '../../repositories/UserRepository';
import NotFoundError from '../../errors/NotFoundError';

jest.mock('../../repositories/UserRepository');

describe('GetById User Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user if found', async () => {
    const mockUser = { id: 1, firstName: 'Diego' };
    (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await GetById.execute(1);

    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundError if user not found', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(GetById.execute(999)).rejects.toThrow(NotFoundError);
  });
});