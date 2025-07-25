const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
    // defaultScope: { where: { disabled: false } },
    // scopes: {
    //   disabled: {
    //     where: {
    //       disabled: true,
    //     },
    //   },
    // },
  }
);

module.exports = User;
