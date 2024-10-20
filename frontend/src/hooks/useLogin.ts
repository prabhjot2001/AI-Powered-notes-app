import { SERVER_AUTH_URL } from "@/constants/env";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type PropsType = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const login = async ({ email, password }: PropsType) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${SERVER_AUTH_URL}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "notes-user-token",
          JSON.stringify({
            email: response.data.email,
            token: response.data.token,
            name: response.data.name,
          })
        );

        // console.log(response.data.token)
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
        setSuccess("Logged In successfully");
        setError(null);
      }
    } catch (error) {
      //   console.log(error.response.data.msg);
      setError(error.response.data.msg);
      setIsLoading(false);
    }
  };
  return { login, isLoading, error, success };
};

export default useLogin;
