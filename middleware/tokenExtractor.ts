const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const { Session, User } = require("../models");

const tokenExtractor = async (
  req: {
    [x: string]: any;
    get: (arg0: string) => any;
    decodedToken: any;
  },
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
      const user = await User.findByPk(req.decodedToken.id);
      if (user.dataValues.disabled === true) {
        return res.status(401).json({ error: "user disabled" });
      }
      req.session = await Session.findOne({
        where: { userId: req.decodedToken.id },
      });
      if (
        !req.session ||
        req.session.dataValues.token !== authorization.substring(7)
      ) {
        return res.status(401).json({ error: "session expired" });
      }
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};
module.exports = tokenExtractor;
