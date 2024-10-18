import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import useNotesContext from "@/hooks/useNotesContext";

type NotesType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const SortBy = () => {
  const { notes, dispatch } = useNotesContext();
  function sortByDateCreated() {
    const data = [...notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    dispatch({ type: "SET_NOTES", payload: data });
  }

  function sortByRecentlyModified() {
    const data = [...notes].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    dispatch({ type: "SET_NOTES", payload: data });
  }

  function sortByAlphabeticalOrder() {
    const sortedNotes = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    dispatch({ type: "SET_NOTES", payload: sortedNotes });
  }

  function handleChange(e) {
    if (e == "date-created") {
      sortByDateCreated();
    } else if (e == "alphabetically") {
      sortByAlphabeticalOrder();
    } else if (e == "recently-updated") {
      sortByRecentlyModified();
    }
  }
  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            <SelectItem value="date-created">Date created</SelectItem>
            <SelectItem value="recently-updated">Recently Updated</SelectItem>
            <SelectItem value="alphabetically">Alphabetically</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy;
