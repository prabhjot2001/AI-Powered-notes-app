import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 border-b sticky top-0 bg-background z-10">
      <div>
        <Logo />
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="hover:underline decoration-primary">
          Login
        </Link>
        <Link to="/register" className="hover:underline decoration-primary">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
