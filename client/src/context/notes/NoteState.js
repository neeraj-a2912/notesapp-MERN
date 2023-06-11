import { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props) => {
  const host = "http://localhost:5000/api/v1/notes";
  const [notes, setNotes] = useState([]);

  // GET All Notes

  const getAllNotes = async () => {
    const response = await fetch(`${host}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const data = await response.json();
    setNotes(data.notes);
  };

  // Add a Note
  const addNote = async (title, content) => {
    await fetch(`${host}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, content }),
    });
    // const data = await response.json();
  };

  // Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
  };

  // Edit a Note
  const editNote = async (id, title, content) => {
    await fetch(`${host}/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, content }),
    });
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
