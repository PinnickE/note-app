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
    /**
     * find all the notes pertaining to a particular user (67a4a363af49dba8e429dd39)
     * send responss to the frontend
     */

    try {
        const allNotes = await Note.find({userId: "67a4a8370cca69cdace1e68c"})
    
        return res.status(200).json({
            success: true,
            allNotes 
         })
    } catch (error) {
        
    }
})

router.put('/update-note', async (req, res) => {
    console.log("Note Updated")
})

router.delete('/delete-note', async (req, res) => {
    console.log("Note deleted")
})

export default router