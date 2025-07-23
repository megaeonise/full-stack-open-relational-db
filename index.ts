// require("dotenv").config();
// const { Sequelize, QueryTypes } = require("sequelize");
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres'
// });

// const main = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
//     console.log(blogs)
//     sequelize.close();
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// main();
// require("express-5.x-async-errors"); shame
const express = require("express");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const errorHandler = require("./middleware/errorHandler");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
