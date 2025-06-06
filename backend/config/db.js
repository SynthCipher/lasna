import mongoose from "mongoose";
// function to connect to the MongoDb Database
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("DataBase IS COnnected")
  );
  const conn=await mongoose.connect(`${process.env.MONGODB_URI}`);
  console.log(`MongoDB Connected : ${conn.connection.host}`);
};
export default connectDB;
