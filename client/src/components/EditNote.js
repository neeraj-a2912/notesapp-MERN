import React from "react";
import { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const fetchNote = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/notes/${params.noteId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const data = await response.json();
    setTitle(data.note.title);
    setContent(data.note.content);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const context = useContext(NoteContext);
  const { editNote } = context;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    editNote(params.noteId, title, content);
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
        <button>Edit Note</button>
      </form>
    </div>
  );
}
