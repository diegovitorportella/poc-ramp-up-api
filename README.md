# POC - API de Usuários (Ramp Up Backend)

API RESTful desenvolvida durante o programa de Ramp Up, com foco na implementação de um CRUD de usuários aplicando **Clean Architecture** e boas práticas de desenvolvimento.

O projeto foi refatorado para garantir o desacoplamento entre as regras de negócio, a camada de persistência e os controladores.

## Tecnologias

* **Node.js** e **Express**
* **PostgreSQL** e **Sequelize** (ORM)
* **Joi** (Validação de dados)
* **Clean Architecture** (Use Cases, Repositories e Controllers)

## Arquitetura e Funcionalidades

O sistema está estruturado para isolar as responsabilidades, garantindo que o controlador não tenha conhecimento das regras de banco de dados ou de negócio complexas.

* **CRUD Completo**: Implementação das operações de criação, leitura, atualização e exclusão de usuários na rota `/users`.
* **Clean Architecture**:
  * **Controllers**: Responsáveis apenas por receber a requisição HTTP e devolver a resposta.
  * **Use Cases**: Encapsulam toda a regra de negócio (ex: verificação de e-mail duplicado, lógica de filtros).
  * **Repositories**: Abstraem o acesso ao banco de dados (Sequelize), facilitando a manutenção e testes.
* **Listagem Avançada**: A lógica de listagem suporta **filtros** (por nome, e-mail e idade), **paginação** e **ordenação**, gerenciados diretamente na camada de Use Case.
* **Validação de Dados**: Middleware integrado com **Joi** para garantir que os dados de entrada (payload) estejam corretos antes de serem processados.
* **Tratamento de Erros**: Middleware centralizado para capturar exceções (como `NaoEncontrado` ou `RequisicaoIncorreta`) e padronizar as respostas da API.

