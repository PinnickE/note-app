import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:{type: String, required: true},
    password: {type: String, required: true},
    state: {type: String},
    role: {type: String},
})

const User = mongoose.model('User', UserSchema)

export default User


/**
 * Import mongoose
 * define a schema for the model
 * create the model
 * export the model
 * 
 * user 1 - user
 * user 2 - user
 * user 3 - admin
 * user 4 - user
 * user 5 - admin
 * 
 */