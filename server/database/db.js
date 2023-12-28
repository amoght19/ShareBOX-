const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.MONGODB_URL;

const DBConnection = async () => {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("Db connected");
  } catch (err) {
    console.log("could not connect to database ", err.message);
  }
};

module.exports = DBConnection;
