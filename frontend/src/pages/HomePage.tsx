import { useEffect, useState } from "react";
import { SERVER_URL } from "@/constants/env";
import SortBy from "@/components/custom/SortBy";
import useNotesContext from "@/hooks/useNotesContext";
import Notes from "@/components/custom/Notes";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const HomePage = () => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
  }, [dispatch, navigate, user.id]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="">
      <div className="mb-8 p-2 flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          All Notes
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hidden sm:block border-b bg-background py-1 focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <Button
                variant="secondary"
                onClick={clearSearch}
                className="ml-2 flex items-center gap-2"
              >
                Clear <X className="w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
          {/* <<<  Sorting component is here  >>> */}
          <SortBy />
        </div>
      </div>
      {/* Notes component, rendering filtered notes */}
      <Notes
        notes={filteredNotes}
        allnotes={notes}
        dispatch={dispatch}
        loading={loading}
        searchQuery={searchQuery}
      />
    </main>
  );
};

export default HomePage;
