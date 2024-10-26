import { createContext, useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserAuthContext = createContext(null);

type PropsType = {
  children: React.ReactNode;
};

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Invalid token", error);
    return true; 
  }
};

const UserAuthContextProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("notes-user-token");

    if (storedData) {
      const user = JSON.parse(storedData);

      if (isTokenExpired(user.token)) {
        logoutUser();
      } else {
        dispatch({ type: "LOGIN", payload: user });
      }
    }

    setLoading(false);
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
      {!loading && children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
