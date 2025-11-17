POC - API de Usuários (Ramp Up)
API desenvolvida como parte do programa de Ramp Up, focada na construção de um CRUD de usuários.

Este projeto documenta o progresso atual, implementando um CRUD funcional em Node.js com Express e Mongoose, e servirá como base para as próximas etapas de refatoração e implementação de novas tecnologias conforme a especificação da POC.

Status Atual: Funcional com Mongoose
A API no estado atual está 100% funcional e inclui as seguintes features:

CRUD Completo: Todas as rotas de (GET, POST, PUT, DELETE) para usuários estão implementadas e funcionando.

Filtros Dinâmicos: A rota GET /users aceita query params para filtragem por firstName, lastName, email e intervalos de idade (minAge, maxAge).

Paginação e Ordenação: A rota principal GET /users utiliza um middleware que permite paginação (pagina, limite) e ordenação dinâmica (ordenacao).

Validação Robusta (Mongoose): O modelo de usuário (user.js) utiliza validações internas do Mongoose, incluindo required, trim, lowercase, minlength/maxlength e regex para email.

Tratamento de Erros: O app possui um sistema centralizado de error handling com classes de erro personalizadas (ErroBase, NaoEncontrado, ErroValidacao, etc.) e middlewares dedicados.
