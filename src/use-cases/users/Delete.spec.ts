import Delete from './Delete';
import userRepository from '../../repositories/UserRepository';
import NotFoundError from '../../errors/NotFoundError';

jest.mock('../../repositories/UserRepository');

describe('Delete User Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a user successfully', async () => {
    // Simula que 1 linha foi deletada
    (userRepository.delete as jest.Mock).mockResolvedValue(1);

    const result = await Delete.execute(1);

    expect(userRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ message: "User deleted successfully" });
  });

  it('should throw NotFoundError if user to delete does not exist', async () => {
    // Simula que 0 linhas foram afetadas
    (userRepository.delete as jest.Mock).mockResolvedValue(0);

    await expect(Delete.execute(999)).rejects.toThrow(NotFoundError);
  });
});