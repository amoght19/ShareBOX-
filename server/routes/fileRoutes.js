const express = require("express");
const router = express.Router();
const handlers = require("../controllers/fileHandler.js");
const bodyParser = require("body-parser");
const upload = require("../utils/upload.js");
const jwt = require("jsonwebtoken");
router.use(bodyParser.urlencoded({ extended: true }));

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.API_SECRET_KEY, (error, payload) => {
      if (error) {
        res.status(403).json({ error: error.message });
      }
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

router.get("/", verifyToken, handlers.rootHandler);
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  handlers.uploadHandler
);
router.get("/get/:fileID", handlers.downloadHandler);
router.post("/user", verifyToken, handlers.userDataHandler);

module.exports = router;
