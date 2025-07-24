const { Op } = require("sequelize");
const router = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");

router.get("/", async (req: any, res: { json: (arg0: any) => void }) => {
  const blogs = await Blog.findAll({
    include: { model: User, attributes: ["name"] },
    where: {
      [Op.or]: [
        {
          title: { [Op.substring]: req.query.search ? req.query.search : "" },
        },
        {
          author: { [Op.substring]: req.query.search ? req.query.search : "" },
        },
      ],
    },
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req: any, res: any) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  res.json(blog);
});

const blogFinder = async (
  req: { blog: any; params: { id: any } },
  _res: any,
  next: () => void
) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete(
  "/:id",
  tokenExtractor,
  blogFinder,
  async (req: any, res: any) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (user.id === req.blog.userId) {
      await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json(req.params.id);
    } else {
      return res.status(401).json({ error: "wrong user" });
    }
  }
);

router.put("/:id", blogFinder, async (req: any, res: any) => {
  await Blog.update(
    { likes: req.body.likes },
    {
      where: {
        id: req.blog.id,
      },
    }
  );
  res.json({ likes: req.body.likes });
});
module.exports = router;
