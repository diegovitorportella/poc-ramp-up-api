import { Sequelize } from 'sequelize';
import User from './User';
import 'dotenv/config';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});

User.initModel(sequelize);

export { sequelize };
export default User;