import { Sequelize } from 'sequelize';
import User from './User';

const databaseConfig = require('../database/config');

const sequelize = new Sequelize(databaseConfig);

User.initModel(sequelize);

export { sequelize };
export default User;