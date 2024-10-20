import { useAuthContext } from "./useAuthContext";
import useNotesContext from "./useNotesContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: d } = useNotesContext();

  const logout = () => {
    localStorage.removeItem("notes-user-token");
    dispatch({ type: "LOGOUT" });
    d({ type: "SET_NOTES", payload: [] });
  };

  return { logout };
};

export default useLogout;
