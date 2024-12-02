import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL, SERVER_AI_URL } from "@/constants/env";
import { Bookmark, Ellipsis, LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/custom/Modal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NoteType = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
};

const initialNote: NoteType = {
  title: "",
  content: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isBookmarked: false,
};

const NotePage = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("notes-user-token");
  const [loading, setLoading] = useState(false);
  const [summarizedText, setSummarizedText] = useState("");

  if (!storedData) {
    console.error("No token found");
    toast.error("Not authenticated. Please log in.");
    navigate("/demo");
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

  const handleBookmark = async () => {
    try {
      const response = await axios.patch(
        `${SERVER_URL}/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setNote((prevNote) => ({
          ...prevNote,
          isBookmarked: !prevNote.isBookmarked,
        }));
        toast.success(
          `Note ${response.data.isBookmarked ? "bookmarked" : "unbookmarked"}`
        );
      } else {
        toast.error("Failed to update bookmark status");
      }
    } catch (error) {
      toast.error("An error occurred while updating bookmark status");
    }
  };

  const extractText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleAiResponse = async () => {
    setLoading(true);

    // check whether we have note or not
    if (!note.content) {
      setLoading(false);
      return toast.error("Cannot summarize, empty note");
    }
    const plainText = extractText(note.content);

    try {
      const response = await fetch(`${SERVER_AI_URL}/summarize-note`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: plainText }),
      });

      // set the summarized text
      if (response.ok) {
        const aiData = await response.json();
        // console.log("AI response is -->", aiData.summary);
        setSummarizedText(aiData.summary);
        toast.success("Text summarized successfully!");
      } else {
        toast.error("Failed to summarize note");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative flex  justify-end pr-2">
        <div className="flex gap-4">
          <Bookmark
            onClick={handleBookmark}
            className={`hover:cursor-pointer ${
              note.isBookmarked ? "fill-primary text-primary" : ""
            }`}
          />
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

      <div className="mt-4">
        <Button
          disabled={loading}
          type="button"
          onClick={handleAiResponse}
          className="bg-gradient-to-r from-orange-600 to-orange-500"
        >
          {!loading && <Sparkles className="w-4 mr-2" />}{" "}
          {loading && <LoaderCircle className="w-4 animate-spin" />}
          {loading ? "Loading..." : "  Summarize Note"}
        </Button>
      </div>

      {/* summarize text will be shown here */}
      {summarizedText && (
        <div className="border rounded-md p-4 mt-6 bg-gradient-to-r from-primary/50 to-secondary">
          <h2 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight first:mt-0">
            Note Summary
          </h2>
          <p>{summarizedText}</p>
        </div>
      )}

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
