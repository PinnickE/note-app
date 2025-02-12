import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description:{type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const Note = mongoose.model('Note', NoteSchema)

export default Note


/**
 * Import mongoose
 * define a schema for the model
 * create the model
 * export the model
 * 
 */