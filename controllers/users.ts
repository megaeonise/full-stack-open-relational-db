const router = require("express").Router();

const { User } = require("../models");
const { Blogs } = require("../models");

router.get("/", async (_req: any, res: { json: (arg0: any) => void }) => {
  const users = await User.findAll({
    include: { model: Blogs, attributes: ["title"] },
  });
  res.json(users);
});

router.post(
  "/",
  async (
    req: { body: any },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): any; new (): any };
      };
    }
  ) => {
    const user = await User.create(req.body);
    res.json(user);
  }
);

router.put("/:username", async (req: any, res: any) => {
  console.log(req.params.username, req.body.username);
  await User.update(
    { username: req.body.username },
    {
      where: {
        username: req.params.username,
      },
    }
  );
  res.json({ username: req.body.username });
});

module.exports = router;
