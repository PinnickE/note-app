import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.DATABASE)
}

export default connectToDB;