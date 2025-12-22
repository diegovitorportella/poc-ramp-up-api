import Create from './Create';
import userRepository from '../../repositories/UserRepository';
import BadRequestError from '../../errors/BadRequestError';

// Mockamos o repositório inteiro
jest.mock('../../repositories/UserRepository');

describe('Create User Use Case', () => {
  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    // Cenário: Email não existe, criação funciona
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (userRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      firstName: 'Diego',
      email: 'diego@teste.com'
    });

    const result = await Create.execute({
      firstName: 'Diego',
      lastName: 'Portella',
      age: 25,
      email: 'diego@teste.com'
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith('diego@teste.com');
    expect(userRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id', 1);
  });

  it('should throw BadRequestError if email already exists', async () => {
    // Cenário: Email já existe no banco
    (userRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'diego@teste.com' });

    // Espera que a execução falhe
    await expect(
      Create.execute({
        firstName: 'Diego',
        lastName: 'Portella',
        age: 25,
        email: 'diego@teste.com'
      })
    ).rejects.toThrow(BadRequestError);

    // Garante que NÃO tentou criar
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});