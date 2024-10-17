import { useEffect, useState } from "react";
import { SERVER_URL } from "@/constants/env";
import { Button } from "@/components/ui/button";
import { ChevronRight, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import SortBy from "@/components/custom/SortBy";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NotesType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const HomePage = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const [notes, setNotes] = useState<NotesType[]>([]);
  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await fetch(`${SERVER_URL}`);
      const json = await response.json();
      if (response.ok) {
        setNotes(json);
      }
    };
    fetchAllNotes();
  }, []);

  async function handleDelete(id: string) {
    const response = await axios.delete(`${SERVER_URL}/${id}`);
    if (response.statusText === "OK") {
      toast.success("Note deleted successfully");
      window.location.reload();
    }
  }
  return (
    <main className="">
      <div className="mb-8 p-2 flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          All Notes
        </h1>
        {/* sorting component */}
        <SortBy notes={notes} setNotes={setNotes} />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around md:flex-wrap gap-2">
        {notes &&
          notes.map((note, idx) => (
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
                      variant={"secondary"}
                      size={"sm"}
                      className="text-xs"
                    >
                      Update
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm text-muted-foreground">
                {note.content.slice(0, 60)}{" "}
                {note.content.length > 60 ? "..." : ""}
              </p>

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
