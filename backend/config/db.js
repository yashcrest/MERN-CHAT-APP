const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (err) {
    console.log("Connection failed: ", err);
  }
};

module.exports = connectDB;
