import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
  const context = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = context;
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newNote = { title, content };
    addNote(newNote.title, newNote.content);
    setContent("");
    setTitle("");
    navigate("/home");
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Description</label>
        <br />
        <textarea
          type="text"
          name="content"
          required
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button>Add Note</button>
      </form>
    </div>
  );
}
