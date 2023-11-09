const express = require('express');
const router = express.Router();
const Note = require('../model/noteModel');

// Route pour créer une nouvelle note
router.post('/notes', async (req, res) => {
    try {
        const { title } = req.body;
        const newNote = new Note({ title });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour récupérer toutes les notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour récupérer une note par son ID
router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour mettre à jour une note par son ID
router.put('/notes/:id', async (req, res) => {
    try {
        const { title } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (updatedNote) {
            res.json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour supprimer une note par son ID
router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (deletedNote) {
            res.json({ message: 'Note deleted' });
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
