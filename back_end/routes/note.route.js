import express from 'express'
import Note from '../models/note.js'

const router = express.Router()

router.post('/create-note', async (req, res) => {
    try {
        const {title, description, userId} = req.body;

        const newNoteObject = new Note({
            title,
            description,
            userId
        });

        await newNoteObject.save()
        return res.status(201).json({
            success: true,
            message: "Note created successfully.",
            note: newNoteObject
         })


    } catch (error) {
        
    }
})

router.get('/get-notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ success: true, notes });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    } 
})

router.put('/update-note', async (req, res) => {
    console.log("Note Updated")
})

router.delete('/delete-note', async (req, res) => {
    console.log("Note deleted")
})

export default router