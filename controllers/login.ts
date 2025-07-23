const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { SECRET } = require("../util/config");

loginRouter.post(
  "/",
  async (
    request: { body: { username: any; password: any } },
    response: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): any; new (): any };
        send: {
          (arg0: { token: any; username: any; name: any }): void;
          new (): any;
        };
      };
    }
  ) => {
    const { username, password } = request.body;

    const user = await User.findOne({ where: { username: username } });
    const passwordCorrect = user === null ? false : password === "secret";

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  }
);

module.exports = loginRouter;
