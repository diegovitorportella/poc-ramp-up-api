import Update from './Update';
import userRepository from '../../repositories/UserRepository';
import NotFoundError from '../../errors/NotFoundError';

// Mockamos o repositório para não bater no banco real
jest.mock('../../repositories/UserRepository');

describe('Update User Use Case', () => {
  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a user successfully', async () => {
    // 1. Simula que encontrou o usuário (findById)
    (userRepository.findById as jest.Mock).mockResolvedValue({ id: 1, firstName: 'Old Name' });
    
    // 2. Simula que a atualização funcionou (update retorna [1] indicando 1 linha afetada)
    (userRepository.update as jest.Mock).mockResolvedValue([1]); 

    const result = await Update.execute(1, { firstName: 'New Name' });

    // Verificações
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.update).toHaveBeenCalledWith(1, { firstName: 'New Name' });
    expect(result).toEqual({ message: "User updated successfully" });
  });

  it('should throw NotFoundError if user not found', async () => {
    // Simula que NÃO encontrou o usuário (retorna null)
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    // Espera que a execução falhe com NotFoundError
    await expect(
      Update.execute(999, { firstName: 'New Name' })
    ).rejects.toThrow(NotFoundError);

    // Garante que o método update NEM CHEGOU a ser chamado
    expect(userRepository.update).not.toHaveBeenCalled();
  });
});