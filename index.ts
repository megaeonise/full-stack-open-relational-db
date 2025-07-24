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
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const authorRouter = require("./controllers/authors");
const loginRouter = require("./controllers/login");
const readingListRouter = require("./controllers/readingLists");

const errorHandler = require("./middleware/errorHandler");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);

app.use("/api/login", loginRouter);
app.use(errorHandler);
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
