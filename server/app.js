const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/notesDB");

// Create a schema and model for notes
const noteSchema = {
  title: String,
  content: String,
};
const Note = mongoose.model("Note", noteSchema);

// CRUD Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const savedNote = await note.save();
    res.status(201).send(savedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.status(200).send(updatedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
