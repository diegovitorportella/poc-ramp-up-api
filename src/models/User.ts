import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// 1. Interface que representa todos os campos da tabela
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  age: number | null;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public age!: number | null;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'first_name', 
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'last_name',
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'email',
            msg: "This email is already registered." 
        },
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users', 
      timestamps: true,
    });
    return User;
  }
}

export default User;