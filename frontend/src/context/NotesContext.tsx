import React, { createContext, useReducer } from "react";

export const NotesContext = createContext(null);

type PropsType = {
  children: React.ReactNode;
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  notes: [],
};

const NotesContextProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
