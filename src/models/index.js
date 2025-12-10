// src/models/index.js
import { Sequelize } from 'sequelize';
import Usuario from './user.js';
import 'dotenv/config'; // Garante que as variáveis de ambiente foram carregadas

// Configuração da conexão com banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Define como true se quiser ver as queries SQL no console
    define: {
      timestamps: true,
      underscored: true // Força snake_case em campos criados automaticamente
    }
  }
);

// Lista de modelos para inicializar
const models = [Usuario];

// 1. Inicializa cada modelo passando a conexão
models.forEach((model) => model.init(sequelize));

// 2. Executa as associações (se existirem)
models.forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

// Exporta a instância do sequelize e os modelos
export { sequelize };
export default Usuario; // Exportação padrão para facilitar imports diretos