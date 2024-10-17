import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SERVER_URL } from "@/constants/env";
import toast from "react-hot-toast";

const AddNotePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Title and notes cannot be empty");
    }
    const response = await fetch(`${SERVER_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({ ...formData, title: "", content: "" });
      toast.success("Note is added");
    }
  }
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        Add note
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
          <Button>Submit</Button>
        </form>
      </div>
    </>
  );
};

export default AddNotePage;
