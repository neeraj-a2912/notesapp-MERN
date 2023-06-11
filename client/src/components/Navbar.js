import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <navbar>
        <div className="logo">
          <Link to="/home">iNoteBook</Link>
        </div>
        <div className="add-logout">
          <Link to="/addnote" className="new-note material-symbols-outlined">
            add
          </Link>
          <Link
            to="/"
            className="logout material-symbols-outlined"
            onClick={() => {
              localStorage.clear();
            }}
          >
            logout
          </Link>
        </div>
      </navbar>
    </div>
  );
}
