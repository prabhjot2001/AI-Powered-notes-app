import { UserAuthContext } from "@/context/UserAuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error(`Auth context must be use inside UserAuthContextProvider`);
  }
  return context;
};
