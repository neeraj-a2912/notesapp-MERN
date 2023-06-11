import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Note(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="note-card">
      <div className="title-edit-delete">
        <div className="title">
          <p>{props.title}</p>
        </div>
        <div className="edit-delete">
          <Link
            to={`/editnote/${props.noteId}`}
            className="material-symbols-outlined"
          >
            edit
          </Link>
          <Link
            to="/home"
            className="material-symbols-outlined"
            onClick={() => {
              deleteNote(props.noteId);
            }}
          >
            delete
          </Link>
        </div>
      </div>
      <p>{props.content}</p>
    </div>
  );
}
