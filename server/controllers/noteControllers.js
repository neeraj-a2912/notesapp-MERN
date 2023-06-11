import noteModel from "../models/Notes.js";
import { validationResult } from "express-validator";

// GET all notes of current user
export const fetchAllNotes = async (req, res) => {
  try {
    const id = await req.id;
    const notes = await noteModel.find({ user: id }).sort({ date: -1 });
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET Note by ID

export const fetchNote = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note not Found");
    }
    if (note.user.toString() !== req.id) {
      return res.send("Not Allowed");
    }
    return res.status(200).send({ note });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST new Note
export const addNewNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return req.status(400).json({ errors: errors.array() });
    }
    const newNote = {
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      user: req.id,
    };

    const note = await noteModel.create(newNote);
    return res.status(200).json({ message: "Note Created Successfully", note });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update/Edit a Note

export const updateNote = async (req, res) => {
  // Find the Note to be Updated
  try {
    let note = await noteModel.findById({ _id: req.params.id });
    if (!note) {
      return res.status(400).json({ message: "Note not Found" });
    }

    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await noteModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Note Updated Successfully", note });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Note

export const deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(400).json({ message: "Note not Found" });
    }
    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }
    const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
