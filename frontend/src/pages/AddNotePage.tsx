import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { SERVER_URL } from "@/constants/env";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAuthContext";
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


const AddNotePage = () => {
  const storedData = localStorage.getItem("notes-user-token");
  const { user } = useAuthContext();
  if (!storedData) {
    console.error("No token found");
    toast.error("Not authenticated. Please log in.");
    return;
  }

  const { token } = JSON.parse(storedData);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    id: "",
  });
  useEffect(() => {
    setFormData({ ...formData, id: user.id });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleContentChange(value: string) {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Title and notes cannot be empty");
    }

    try {
      const response = await fetch(`${SERVER_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ ...formData, title: "", content: "" });
        toast.success("Note is added");
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      toast.error("An error occurred");
      // console.error("Error adding note:", error);
    }
  }

  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        Add note
      </h1>
      <div className="min-h-max flex flex-col py-10">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <input
            placeholder="Title here..."
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-background text-3xl font-semibold text-muted-foreground focus:outline-none"
          />

          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Your note here..."
            modules={modules}
            className="rounded-md"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default AddNotePage;
