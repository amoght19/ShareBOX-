const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const rootHandler = (req, res) => {
  res.json({
    message: "Hello from api route",
  });
};

const signInHandler = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const payload = { username: username };
  const secret = process.env.API_SECRET_KEY;

  try {
    const user = await User.findOne({ username: username, password: password });

    if (user == null) {
      res.sendStatus(401);
    } else {
      jwt.sign(payload, secret, { expiresIn: "10h" }, (error, token) => {
        const data = JSON.stringify(user);
        res.json({ token: token, data: data });
      });
    }
  } catch (err) {
    console.log("Sign In error ", err);
    res.sendStatus(400);
  }
};

const signUpHandler = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username;

  const payload = { username: username };
  const secret = process.env.API_SECRET_KEY;

  try {
    const user1 = await User.findOne({ username: username });
    const user2 = await User.findOne({ email: email });

    if (user1 != null || user2 != null) {
      res.sendStatus(400);
    } else {
      const userObj = {
        username: username,
        password: password,
        email: email,
        files: [],
      };

      await User.create(userObj);
      jwt.sign(payload, secret, { expiresIn: "10h" }, (error, token) => {
        const data = JSON.stringify(userObj);
        res.json({ token: token, data: data });
      });
    }
  } catch (err) {
    console.log("Sign Up error ", err);
    res.sendStatus(400);
  }
};

module.exports = {
  rootHandler,
  signInHandler,
  signUpHandler,
};
