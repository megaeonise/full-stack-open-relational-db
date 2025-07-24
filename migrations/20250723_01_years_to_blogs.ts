const { DataTypes } = require("sequelize");

module.exports = {
  //@ts-ignore

  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: { args: [1991], msg: "Year must be greater or equal to 1991" },
        max: {
          args: [new Date().getFullYear()],
          msg: "Year must be less than or equal to current year",
        },
      },
    });
  },
  //@ts-ignore
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
