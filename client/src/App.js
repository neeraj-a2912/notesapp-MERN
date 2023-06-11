import "./App.css";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Notes />} />
        <Route exact path="/addnote" element={<NewNote />} />
        <Route exact path="/editnote/:noteId" element={<EditNote />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
