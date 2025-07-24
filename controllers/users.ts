const router = require("express").Router();
const { User } = require("../models");
const { Blog } = require("../models");
const { ReadingList } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (_req: any, res: { json: (arg0: any) => void }) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: ["title"] },
  });
  res.json(users);
});

router.get("/:id", async (req: any, res: { json: (arg0: any) => void }) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "user", "createdAt", "updatedAt"] },
        through: {
          attributes: [],
        },
        include: {
          model: ReadingList,
          as: "readinglists",
          attributes: ["id", "read"],
          where: {
            [Op.or]: [
              {
                read: {
                  [Op.eq]: req.query.read ? req.query.read : false,
                },
              },
              {
                read: {
                  [Op.eq]: req.query.read ? req.query.read : true,
                },
              },
            ],
          },
        },
      },
    ],
  });
  res.json(user);
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
