// const { Op } = require("sequelize");
const { sequelize } = require("../util/db");
const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (_req: any, res: { json: (arg0: any) => void }) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});
module.exports = router;
