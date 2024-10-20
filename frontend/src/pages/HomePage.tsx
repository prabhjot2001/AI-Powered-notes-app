import { useEffect, useState } from "react";
import { SERVER_URL } from "@/constants/env";
import SortBy from "@/components/custom/SortBy";
import useNotesContext from "@/hooks/useNotesContext";
import Notes from "@/components/custom/Notes";
import toast from "react-hot-toast";

const HomePage = () => {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const storedData = localStorage.getItem("notes-user-token");

    if (!storedData) {
      console.error("No token fou5nd");
      toast.error("Not authenticated. Please log in.");
      return;
    }

    const { token } = JSON.parse(storedData);

    if (!token) {
      console.error("JWT token is missing");
      toast.error("JWT token is missing. Please log in.");
      return;
    }

    const fetchAllNotes = async () => {
      const response = await fetch(`${SERVER_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.status === 401) {
        toast.error("Unauthorized, cannot access notes");
      }

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };

    fetchAllNotes();
  }, [dispatch]);

  return (
    <main className="">
      <div className="mb-8 p-2 flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          All Notes
        </h1>
        {/* sorting component */}
        <SortBy />
      </div>
      {/* notes component, rendering all notes */}
      <Notes notes={notes} dispatch={dispatch} />
    </main>
  );
};

export default HomePage;
