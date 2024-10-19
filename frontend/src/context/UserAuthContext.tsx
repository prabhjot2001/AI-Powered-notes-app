import { createContext, useReducer } from "react";

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
  return (
    <UserAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
