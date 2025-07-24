const tokenExtractor = require("../middleware/tokenExtractor");
const router = require("express").Router();
const { ReadingList } = require("../models");

router.post("/", tokenExtractor, async (req: any, res: any) => {
  const readingList = await ReadingList.create({
    ...req.body,
    read: false,
  });
  res.json(readingList);
});

router.put("/:id", tokenExtractor, async (req: any, res: any) => {
  if (req.body.read && req.body.read === true) {
    await ReadingList.update(
      { read: true },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Blog marked as read" });
  } else {
    res.status(400).json({ msg: "Bad request" });
  }
});
module.exports = router;
