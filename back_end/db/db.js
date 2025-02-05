import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.DATABASE)
    // mongoose.set("strictQuery", true);
    console.log("Database is Running")
}

export default connectToDB;