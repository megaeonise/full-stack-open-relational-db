const tokenExtractor = require("../middleware/tokenExtractor");
const router = require("express").Router();
const { Session } = require("../models");

router.delete("/", tokenExtractor, async (req: any, res: any) => {
  await Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  });

  res.json({ msg: `UserId: ${req.decodedToken.id} logged out` });
});

module.exports = router;
