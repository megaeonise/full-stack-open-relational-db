
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
require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});


class Blogs extends Model {}
Blogs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogs'
})

app.get('/api/blogs', async (_req: any, res: { json: (arg0: any) => void; }) => {
  const blogs = await Blogs.findAll()
  console.log(JSON.stringify(blogs))
  res.json(blogs)
})

app.post('/api/blogs', async (req: any, res: any) => {
  console.log(req.body)
  try {
    const blog = await Blogs.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json()
  }

})
app.delete('/api/blogs/:id', async (req: any, res: any) => {
  console.log(req.params.id)
  await Blogs.destroy({where: {
    id: req.params.id
  }})
  res.json(req.params.id)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})