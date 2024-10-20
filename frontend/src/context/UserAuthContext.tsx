import { createContext, useEffect, useReducer } from "react";

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

  useEffect(() => {
    // Check local storage for user token on mount
    const storedData = localStorage.getItem("notes-user-token");
    if (storedData) {
      const user = JSON.parse(storedData);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Function to handle login and set token
  const loginUser = (userData) => {
    localStorage.setItem("notes-user-token", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  // Function to handle logout and remove token
  const logoutUser = () => {
    localStorage.removeItem("notes-user-token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserAuthContext.Provider
      value={{ ...state, dispatch, loginUser, logoutUser }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
