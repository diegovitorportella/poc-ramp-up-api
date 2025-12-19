# POC - API de Usuários (Ramp Up Backend)

API RESTful desenvolvida durante o programa de Ramp Up, focada na implementação de um CRUD de usuários aplicando **Clean Architecture**, **TypeScript** e boas práticas de desenvolvimento de software.

### Desenvolvido por Diego Portella

O projeto foi totalmente refatorado para garantir o desacoplamento entre regras de negócio, persistência e controladores, além de incluir testes automatizados e controle de versão de banco de dados.

## 🚀 Tecnologias e Ferramentas

* **Linguagem:** TypeScript
* **Runtime:** Node.js
* **Framework:** Express
* **ORM:** Sequelize (com Migrations e Seeders)
* **Banco de Dados:** PostgreSQL
* **Validação:** Joi
* **Testes:** Jest & Supertest
* **Padronização:** ESLint

## 🏗 Arquitetura e Estrutura

O sistema segue os princípios da **Clean Architecture**, isolando responsabilidades para facilitar a manutenção e escalabilidade.

### Destaques da Estrutura
* **Controllers:** Apenas recebem a requisição HTTP e devolvem a resposta. Não contêm regras de negócio.
* **Use Cases:** Organizados por domínio (ex: `src/use-cases/users/Create.ts`). Encapsulam a lógica pura (validações de negócio, regras de unicidade).
* **Repositories:** Abstraem a camada de dados (Sequelize). O restante da aplicação não sabe qual banco está sendo usado.
* **Database:** Configurações centralizadas, Migrations (histórico de schema) e Seeders (dados iniciais) em `src/database`.

### Organização de Pastas
```bash
src/
├── controllers/   # Controladores HTTP
├── database/      # Configuração, Migrations e Seeders
├── middlewares/   # Validação (Joi) e Tratamento de Erros
├── models/        # Definição das tabelas (Sequelize)
├── repositories/  # Acesso ao banco de dados
├── routes/        # Definição das rotas
├── use-cases/     # Regras de Negócio (ex: users/Create.ts)
└── tests/         # Testes de Integração

