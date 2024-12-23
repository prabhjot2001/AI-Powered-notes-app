import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight, Ellipsis, Ghost, Loader2, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_URL } from "@/constants/env";
import { useAuthContext } from "@/hooks/useAuthContext";

type PropsType = {
  notes: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  dispatch: (action: any) => void;
  loading: boolean | null;
};
const BookmarkNotes = ({ notes, dispatch, loading }: PropsType) => {
  const { user } = useAuthContext();
  const storedData = localStorage.getItem("notes-user-token");

  if (!storedData) {
    console.error("No token founed");
    toast.error("Not authenticated. Please log in.");
    return;
  }

  const { token } = JSON.parse(storedData);
  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(`${SERVER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Note deleted successfully");
        dispatch({ type: "DELETE_NOTE", payload: id });
      }
    } catch (error) {
      toast.error("Failed to delete the note");
      console.error("Delete error:", error);
    }
  }

  if (loading === null) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row md:justify-around md:flex-wrap gap-2">
      {notes &&
        notes.map((note) => (
          <div
            key={note.id}
            className="border p-2 rounded space-y-1 transition-all ease-in-out duration-200 hover:shadow-sm hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {note.title.slice(0, 60)} {note.title.length > 60 ? "..." : ""}
              </h4>

              <Popover>
                <PopoverTrigger>
                  <Ellipsis />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 max-w-max p-2">
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    className="text-xs"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    asChild
                    variant={"secondary"}
                    size={"sm"}
                    className="text-xs"
                  >
                    <Link to={`/update-note/${note.id}`}>Update</Link>
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            <div
              className="leading-7 [&:not(:first-child)]:mt-6"
              dangerouslySetInnerHTML={{ __html: note.content.slice(0, 50) }}
            />

            <div className="flex items-center justify-between gap-6">
              <p className="text-xs text-muted-foreground">
                Created At : {note.createdAt.slice(0, 10)}
              </p>
              <Button asChild size={"sm"} variant={"link"}>
                <Link to={`/notes/${note.id}`} className="flex items-center">
                  View <ChevronRight className="w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}

      {user && loading && notes.length <= 0 ? (
        <div className="space-y-4 mt-20 items-center flex flex-col">
          <Loader2 size={30} className="animate-spin text-muted-foreground" />
          <p className="text-xl text-muted-foreground text-center">
            Hang tight! We&apos;re fetching your notes right now.
          </p>
          <p className="text-md text-muted-foreground text-center">
            This may take a moment, depending on your collection.
          </p>
        </div>
      ) : !loading && user && notes.length <= 0 ? (
        <div className="space-y-4 mt-20 items-center flex flex-col">
          <Ghost strokeWidth={1} size={80} className="text-muted-foreground" />
          <div>
            <p className="text-xl text-muted-foreground text-center">
              Oops! It looks like you haven't bookmarked any notes yet.
            </p>
            <p className="text-md text-muted-foreground text-center">
              Start by visiting the notes page, and mark your favorites!
            </p>
            <p className="text-md text-muted-foreground text-center">
              Happy note-taking!
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookmarkNotes;
