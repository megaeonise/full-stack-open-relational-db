const { DataTypes } = require("sequelize");

module.exports = {
  //@ts-ignore
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("blogs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.TEXT,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          minLength(value: String) {
            if (value.length === 0) {
              throw new Error("Validation Error: URL length cannot be 0");
            }
          },
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          minLength(value: String) {
            if (value.length === 0) {
              throw new Error("Validation Error: Title length cannot be 0");
            }
          },
        },
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
    await queryInterface.createTable("users", {
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
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
    await queryInterface.addColumn("blogs", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    });
  },
  //@ts-ignore
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};
