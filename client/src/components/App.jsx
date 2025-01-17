import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the backend on load
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("http://localhost:5000/notes");
        setNotes(res.data); // Fetch notes from the database
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  // Add a new note
  async function addNote(newNote) {
    try {
      const res = await axios.post("http://localhost:5000/notes", newNote);
      setNotes((prevNotes) => [...prevNotes, res.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // Delete a note
  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // Edit a note
  async function editNote(id, updatedNote) {
    try {
      const res = await axios.put(
        `http://localhost:5000/notes/${id}`,
        updatedNote
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...res.data } : note
        )
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
