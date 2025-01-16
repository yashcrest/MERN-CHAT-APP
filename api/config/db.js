//module for connecting to mongoDB
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (err) {
    console.error(`Connection to MongoDB failed with  error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
