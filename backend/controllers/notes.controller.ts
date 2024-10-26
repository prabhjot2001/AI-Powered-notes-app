import type { Request, Response } from "express";
import { prisma } from "../prisma_client/prisma";
import sanitizeHtml from "sanitize-html";

// export const getAllNotes = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // Remove this delay in production environment
//   // I've added for development environments
//   setTimeout(async() => {
//     try {
//       const notes = await prisma.note.findMany({
//         where: {
//           userId: id,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//       res.status(200).json(notes);
//     } catch (error) {
//       res.status(400).json({
//         msg: "something went wrong",
//       });
//     }
//   }, 500); // added settime-out delay to just test frontend loading functionality
// };

export const getAllNotes = async (req: Request, res: Response) => {
  // console.log("hitting getallnotes")
  const { id } = req.params;
  const search = (req.query.search as string) || "";

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: search,
              // mode: "insensitive" as const,
            },
          },
          {
            content: {
              contains: search,
              // mode: "insensitive" as const,
            },
          },
        ],
      },
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const getSingleNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findUnique({
      where: { id: id },
    });
    if (note === null) {
      res.status(400).json({ msg: "No such note available" });
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content, id } = req.body;
  const sanitizedContent = sanitizeHtml(content);
  try {
    const note = await prisma.note.create({
      data: {
        title: title,
        content: content,
        userId: id,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: id },
    });

    if (deleteNote === null) {
      res.status(400).json({ msg: "No such note available" });
    } else {
      res.status(200).json(deleteNote);
    }
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });
    if (updateNote === null) {
      res.status(400).json({ msg: "No such note exist" });
    } else {
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return res.status(404).json({ msg: "Note is not found" });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { isBookmarked: !note.isBookmarked },
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Could not toggle bookmark status, Internal sever error" });
  }
};
