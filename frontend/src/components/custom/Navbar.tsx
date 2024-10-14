import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 border-b sticky top-0 bg-background z-10">
      <div>
        <Logo />
      </div>
      <div className="flex gap-2">
        <Link to="/login" className="hover:underline decoration-primary">
          <Button variant={"secondary"}>Login</Button>
        </Link>
        <Link to="/register" className="hover:underline decoration-primary">
          <Button>Register</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
