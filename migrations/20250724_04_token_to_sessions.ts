const { DataTypes } = require("sequelize");

module.exports = {
  //@ts-ignore

  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("sessions", "token", {
      type: DataTypes.STRING,
    });
  },
  //@ts-ignore
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("sessions", "token");
  },
};
