import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.GIDEONDATABASE)
}

export default connectToDB;