const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Blogs extends Model {}
Blogs.init(
  {
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
            throw new Error("Validation error: URL length cannot be 0");
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
            throw new Error("Validation error: Title length cannot be 0");
          }
        },
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: { args: [1991], msg: "Year must be greater or equal to 1991" },
        max: {
          args: [new Date().getFullYear()],
          msg: "Year must be less than or equal to current year",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blogs",
  }
);

module.exports = Blogs;
