import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import {
  addNewNote,
  deleteNote,
  fetchAllNotes,
  fetchNote,
  updateNote,
} from "../controllers/noteControllers.js";
import { body } from "express-validator";

const noteRouter = express.Router();

noteRouter.get("/", fetchuser, fetchAllNotes);
noteRouter.get("/:id", fetchuser, fetchNote);
noteRouter.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title Cannot be Empty").notEmpty(),
    body("content", "Content Cannot be Empty").notEmpty(),
  ],
  addNewNote
);
noteRouter.patch("/updatenote/:id", fetchuser, updateNote);
noteRouter.delete("/deletenote/:id", fetchuser, deleteNote);

export default noteRouter;
