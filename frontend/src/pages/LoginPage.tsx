import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const { login, isLoading, error, success } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }
    await login(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate("/");
    }
  }, [success]);

  return (
    <div className="max-w-sm mx-auto space-y-4 mt-20">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl text-center">
          Login
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Welcome Back! Log In to Your Account.
        </p>
      </div>
      <form className="space-y-2 " onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button className="w-full" disabled={isLoading}>
          <p className="mr-2">{isLoading ? "Logging you in.." : "Login"}</p>
          {isLoading && <LoaderCircle className="animate-spin" />}
        </Button>

        <div className="pt-4">
          <p className="text-sm leading-none">
            Don&apos;t have an account.{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
