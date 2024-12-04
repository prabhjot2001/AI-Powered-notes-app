import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

import { Component } from "lucide-react";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 text-primary">
      <Component />
      <p className="text-lg font-semibold ">Notes</p>
    </Link>
  );
};

export default Logo;
