import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/constants/env";
import toast from "react-hot-toast";

const UpdateNotePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchSingleNote = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/${id}`);
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
      const response = await axios.patch(`${SERVER_URL}/${id}`, {
        ...formData,
      });
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
        <form className="max-w-md space-y-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Your note here..."
          />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotePage;
