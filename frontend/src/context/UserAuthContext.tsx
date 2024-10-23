import { createContext, useEffect, useReducer, useState } from "react";

export const UserAuthContext = createContext(null);

type PropsType = {
  children: React.ReactNode;
};

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.payload };
    }
    case "LOGOUT": {
      return { user: null };
    }
    default: {
      return state;
    }
  }
};

const UserAuthContextProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedData = localStorage.getItem("notes-user-token");
    if (storedData) {
      const user = JSON.parse(storedData);
      dispatch({ type: "LOGIN", payload: user });
    }
    setLoading(false); // Set loading to false once user data is retrieved
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("notes-user-token", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logoutUser = () => {
    localStorage.removeItem("notes-user-token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserAuthContext.Provider
      value={{ ...state, dispatch, loginUser, logoutUser, loading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
