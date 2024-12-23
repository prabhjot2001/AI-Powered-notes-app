import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/constants/env";
import toast from "react-hot-toast";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

ReactQuill.Quill.register(
  "formats/code-block",
  ReactQuill.Quill.import("formats/code-block")
);

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code-block"],
  ],
};

const UpdateNotePage = () => {
  const { id } = useParams();
  const storedData = localStorage.getItem("notes-user-token");
  const navigate = useNavigate();
  if (!storedData) {
    console.error("No token found");
    toast.error("Not authenticated. Please log in.");
    navigate("/demo");
    return;
  }

  const { token } = JSON.parse(storedData);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchSingleNote = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setFormData({
          title: response.data.title,
          content: response.data.content,
          createdAt: response.data.createdAt,
        });
      } catch (error) {
        toast.error("Failed to fetch note data");
      }
    };
    fetchSingleNote();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleContentChange(value: string) {
    setFormData({ ...formData, content: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Title and notes cannot be empty");
    }
    try {
      const response = await axios.patch(
        `${SERVER_URL}/${id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Note updated successfully");
      } else {
        toast.error("Failed to update the note");
      }
    } catch (error) {
      toast.error("Error updating note");
    }
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        Update note
      </h1>
      <div className="min-h-max flex flex-col py-10">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-background text-3xl font-semibold text-muted-foreground focus:outline-none"
          />

          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            placeholder="Your note here..."
          />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotePage;
