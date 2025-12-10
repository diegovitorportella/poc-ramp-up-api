import { Model, DataTypes } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Este email já está cadastrado." },
      }
    }, {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: true,
    });
    return this;
  }
}