import express, { type Request, type Response } from "express";
import {
  addNewNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
} from "../controllers/notes.controller";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/", addNewNote);
router.delete("/:id", deleteNote);

export default router;
