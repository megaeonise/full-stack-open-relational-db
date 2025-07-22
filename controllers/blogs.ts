const router = require("express").Router();

const { Blogs } = require("../models");

router.get("/", async (_req: any, res: { json: (arg0: any) => void }) => {
  const blogs = await Blogs.findAll();
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.post("/", async (req: any, res: any) => {
  console.log(req.body);
  const blog = await Blogs.create(req.body);
  res.json(blog);
});
router.delete("/:id", async (req: any, res: any) => {
  console.log(req.params.id);
  await Blogs.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(req.params.id);
});

const blogFinder = async (
  req: { blog: any; params: { id: any } },
  _res: any,
  next: () => void
) => {
  req.blog = await Blogs.findByPk(req.params.id);
  next();
};

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
