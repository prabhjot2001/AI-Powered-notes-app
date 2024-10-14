import type { Request, Response } from "express";

export const getAllNotes = (req: Request, res: Response) => {
  res.send("all notes");
};

export const getSingleNote = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(id);
};

export const addNewNote = (req: Request, res: Response) => {
  res.send("add new note");
};

export const deleteNote = (req: Request, res: Response) => {
  res.send("delete note");
};
