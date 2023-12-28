const express = require("express");
const router = express.Router();
const handlers = require("../controllers/loginHandler.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signin", handlers.signInHandler);
router.post("/signup", handlers.signUpHandler);
router.get("/", handlers.rootHandler);

module.exports = router;
