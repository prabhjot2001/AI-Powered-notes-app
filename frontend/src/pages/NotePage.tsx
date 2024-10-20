import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/constants/env";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/custom/Modal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// type NoteType = {};
type NoteType = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const initialNote: NoteType = {
  title: "",
  content: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const NotePage = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("notes-user-token");

  if (!storedData) {
    console.error("No token found");
    toast.error("Not authenticated. Please log in.");
    return;
  }

  const { token } = JSON.parse(storedData);
  const [note, setNote] = useState<NoteType>(initialNote);
  const { id } = useParams();
  useEffect(() => {
    const fetchSingleNote = async () => {
      const response = await axios.get(`${SERVER_URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNote(response.data);
    };
    fetchSingleNote();
  }, []);

  //modal
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleConfirm = async () => {
    const response = await axios.delete(`${SERVER_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.statusText === "OK") {
      handleClose();
      navigate("/");
      window.location.reload();
      toast.success("Note deleted successfully");
    }
  };

  return (
    <div>
      <div className="relative flex justify-end pr-2">
        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 max-w-max p-2 z-10">
            <Button
              variant={"destructive"}
              size={"sm"}
              className="text-xs"
              onClick={() => handleOpen()}
            >
              Delete
            </Button>
            <Button
              asChild
              variant={"secondary"}
              size={"sm"}
              className="text-xs"
            >
              <Link to={`/update-note/${id}`}>Update</Link>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {note.title}
      </h2>

      <div
        className="rich-text mt-6"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div className="py-6">
        <p className="text-xs text-muted-foreground">
          Created At : {note.createdAt.slice(0, 10)}
        </p>
        <p className="text-xs text-muted-foreground">
          Last modified on : {note.updatedAt.slice(0, 10)}
        </p>
      </div>

      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Delete note?"
        onConfirm={handleConfirm}
      >
        <p>Are you sure you want to delete this note</p>
      </Modal>
    </div>
  );
};

export default NotePage;
