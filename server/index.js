const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const loginRouter = require("./routes/loginRoutes.js");
const fileRouter = require("./routes/fileRoutes.js");
const DB = require("./database/db.js");

dotenv.config();
DB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", loginRouter);
app.use("/files", fileRouter);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
