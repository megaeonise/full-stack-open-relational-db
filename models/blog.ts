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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blogs",
  }
);

module.exports = Blogs;
