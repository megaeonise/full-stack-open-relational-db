const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Blogs } = require("../models");
const { User } = require("../models");
const { SECRET } = require("../util/config");

router.get("/", async (_req: any, res: { json: (arg0: any) => void }) => {
  const blogs = await Blogs.findAll({
    include: { model: User, attributes: ["name"] },
  });
  res.json(blogs);
});
const tokenExtractor = (
  req: { get: (arg0: string) => any; decodedToken: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): any; new (): any };
    };
  },
  next: () => void
) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.post("/", tokenExtractor, async (req: any, res: any) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blogs.create({
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
  req.blog = await Blogs.findByPk(req.params.id);
  next();
};

router.delete(
  "/:id",
  tokenExtractor,
  blogFinder,
  async (req: any, res: any) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (user.id === req.blog.userId) {
      await Blogs.destroy({
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
  await Blogs.update(
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
