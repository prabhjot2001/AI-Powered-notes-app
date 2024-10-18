import { useEffect, useState } from "react";
import { SERVER_URL } from "@/constants/env";
import { Button } from "@/components/ui/button";
import { ChevronRight, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import SortBy from "@/components/custom/SortBy";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNotesContext from "@/hooks/useNotesContext";

const HomePage = () => {
  const { notes, dispatch } = useNotesContext();
  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await fetch(`${SERVER_URL}`);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };
    fetchAllNotes();
  }, []);

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(`${SERVER_URL}/${id}`);
      if (response.status === 200) {
        toast.success("Note deleted successfully");
        dispatch({ type: "DELETE_NOTE", payload: id });
      }
    } catch (error) {
      toast.error("Failed to delete the note");
      console.error("Delete error:", error);
    }
  }

  return (
    <main className="">
      <div className="mb-8 p-2 flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          All Notes
        </h1>
        {/* sorting component */}
        <SortBy />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around md:flex-wrap gap-2">
        {notes &&
          notes.map((note) => (
            <div
              key={note.id}
              className="border p-2 rounded space-y-1 hover:bg-primary-foreground"
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {note.title.slice(0, 60)}{" "}
                  {note.title.length > 60 ? "..." : ""}
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
                dangerouslySetInnerHTML={{ __html: note.content.slice(0, 100) }}
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
      </div>
    </main>
  );
};

export default HomePage;
