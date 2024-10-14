import express, { type Request, type Response } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notes.controller";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

export default router;
