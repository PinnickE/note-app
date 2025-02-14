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

// Get a single note by ID
router.get('/get-note/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ success: false, message: "Note not found" });

        res.status(200).json({ success: true, note });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.put('/update-note/:id', async (req, res) => {
    try {
        const { title, description } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

        res.status(200).json({ success: true, message: "Note updated", note: updatedNote });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
})

router.delete('/delete-note/:id', async (req, res) => { 
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) return res.status(404).json({ success: false, message: "Note not found" });

        res.status(200).json({ success: true, message: "Note deleted" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
})

export default router