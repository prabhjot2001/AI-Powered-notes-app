import BookmarkNotes from "@/components/custom/BookmarkNotes";
import { SERVER_URL } from "@/constants/env";
import { useAuthContext } from "@/hooks/useAuthContext";
import useNotesContext from "@/hooks/useNotesContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookmarkedNotesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("notes-user-token");

    if (!storedData) {
      console.error("No token found");
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
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/user/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.status === 401) {
        toast.error("Unauthorized, cannot access notes");
        setLoading(false);
        navigate("/demo");
      }

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
        setLoading(false);
      }
    };

    fetchAllNotes();
  }, [dispatch]);
  const bookmarkedNotes = notes.filter((note) => note.isBookmarked);
  return (
    <>
      <div className="mb-8 p-2 flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          Bookmarked Notes
        </h1>
      </div>
      <BookmarkNotes
        notes={bookmarkedNotes}
        dispatch={dispatch}
        loading={loading}
      />
    </>
  );
};

export default BookmarkedNotesPage;
