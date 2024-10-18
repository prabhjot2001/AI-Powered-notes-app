import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img src={logo} className="w-10"/>
      <p className="text-lg font-semibold">Notes</p>
    </Link>
  );
};

export default Logo;
