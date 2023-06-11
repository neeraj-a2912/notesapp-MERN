import React, { useEffect } from "react";
import Note from "./Note";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Navbar from "./Navbar";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);
  return (
    <div className="App">
      <Navbar />
      <div className="notes">
        {notes &&
          notes.map((note) => (
            <Note
              key={note._id}
              title={note.title}
              content={note.content}
              noteId={note._id}
            />
          ))}
      </div>
    </div>
  );
}
