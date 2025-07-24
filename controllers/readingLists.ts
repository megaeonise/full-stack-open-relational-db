const tokenExtractor = require("../middleware/tokenExtractor");
const router = require("express").Router();
const { ReadingList } = require("../models");

router.post("/", tokenExtractor, async (req: any, res: any) => {
  console.log(req.body);
  console.log(ReadingList);
  const readingList = await ReadingList.create({
    ...req.body,
    read: false,
  });
  res.json(readingList);
});
module.exports = router;
