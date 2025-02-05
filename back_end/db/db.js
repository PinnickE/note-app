import mongoose from "mongoose";

const connectToDB = async () => {
    // await mongoose.connect(process.env.DATABASE)
    await mongoose.connect("mongodb+srv://emmanuelpinnick:RzrjkzQkbMIflavH@cluster0.s142n.mongodb.net/note")
    // await mongoose.connect(process.env.GIDEONDATABASE)
    // mongoose.set("strictQuery", true);
    console.log("Database is Running")  
}

export default connectToDB;