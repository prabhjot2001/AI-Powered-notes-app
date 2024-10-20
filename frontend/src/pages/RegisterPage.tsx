import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "@/hooks/useRegister";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const RegisterPage = () => {
  const { register, isLoading, error, success } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  return (
    <div className="max-w-sm mx-auto space-y-4 mt-20">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl text-center">
          Register
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Create an account to start organizing your notes.
        </p>
      </div>
      <form className="space-y-2 " onSubmit={handleSubmit}>
        <Input
          placeholder="Full name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
          <p className="mr-2">{isLoading ? "Loading..." : "Register"}</p>
          {isLoading && <LoaderCircle className="animate-spin" />}
        </Button>

        <div className="space-y-2 pt-4">
          <p className="text-sm leading-none">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
            .
          </p>

          <p className="text-sm text-muted-foreground">
            By continuing, you agree to Notes&apos;s Terms of Use. Read our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
