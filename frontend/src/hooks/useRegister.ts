import { SERVER_AUTH_URL } from "@/constants/env";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type PropsType = {
  email: string;
  password: string;
  name: string;
};

const useRegister = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async ({ email, password, name }: PropsType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_AUTH_URL}/register`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "notes-user-token",
          JSON.stringify({
            email: response.data.email,
            token: response.data.token,
            id: response.data.id,
            name: response.data.name,
            createdAt : response.data.createdAt,
            updatedAt : response.data.updatedAt
          })
        );

        dispatch({ type: "LOGIN", payload: response.data });
        setSuccess("User registered successfully");
        setIsLoading(false);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.msg);
      } else {
        setError("An unknown error occurred.");
      }
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, success };
};

export default useRegister;
