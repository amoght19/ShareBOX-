const File = require("../models/file.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const rootHandler = (req, res) => {
  res.json({ message: "Hello from file routes" });
};

const uploadHandler = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader.split(" ");

  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.API_SECRET_KEY, async (err, payload) => {
    const username = payload.username;
    try {
      const fileObj = {
        path: req.file.path,
        name: `${Date.now()}-${req.file.originalname}`,
      };

      const file = await File.create(fileObj);

      const user = await User.findOne({ username: username });

      user.files.push({
        href: `/files/get/${file._id}`,
        fileName: req.file.originalname,
      });

      await user.save();

      res.status(200).json({ path: `/files/get/${file._id}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

const downloadHandler = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileID);
    file.downloadContent++;

    await file.save();
    res.download(file.path, file.name);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userDataHandler = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader.split(" ");

  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.API_SECRET_KEY, async (err, payload) => {
    const username = payload.username;
    if (err) {
      res.sendStatus(403);
    }

    try {
      const user = await User.findOne({ username: username });
      res.json(user);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  });
};

module.exports = {
  rootHandler,
  uploadHandler,
  downloadHandler,
  userDataHandler,
};
