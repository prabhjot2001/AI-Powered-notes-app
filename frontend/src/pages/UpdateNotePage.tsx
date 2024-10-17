import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      const response = await axios.get(`${SERVER_URL}/${id}`);
      setFormData({
        ...formData,
        title: response.data.title,
        content: response.data.content,
        createdAt: response.data.createdAt,
      });
    };
    fetchSingleNote();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.patch(`${SERVER_URL}/${id}`,{...formData});
    if (response.statusText === "OK") {
      toast.success("Note updated successfully");
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
          <Textarea
            placeholder="Your note here..."
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
          <Button>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotePage;
