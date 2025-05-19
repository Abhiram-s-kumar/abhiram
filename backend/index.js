const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://abhirambca2021:abhi@cluster0.qqp1mke.mongodb.net/Root?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error", err));

// Schema and model
const noteSchema = new mongoose.Schema({
  title: String,
  text: String
});
const Note = mongoose.model('Note', noteSchema);

// Routes

// Get all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Get note by id
app.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

// Create note
app.post('/notes', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
});

// Update note
app.put('/notes/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete note
app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

app.get('/', (req, res) => {
  res.send("Server is running");
});

app.listen(5001, () => {
  console.log('Server running on port 5001');
});
