import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import NavLinks from "@/data/NavbarLinks";
import { ModeToggle } from "./ModeToggle";
import useLogout from "@/hooks/useLogout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthContext } from "@/hooks/useAuthContext";
import MobileNavbar from "./MobileNavbar";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
      <div>
        <Logo />
      </div>

      {/* on big screen */}
      <ul className="hidden md:flex gap-2">
        {!user &&
          NavLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className="hover:underline decoration-primary"
              >
                <Button className="capitalize">{link.link}</Button>
              </Link>
            </li>
          ))}

        {user && (
          <>
            <li>
              <Link to={"/"} className="hover:underline">
                <Button variant="link" className="capitalize p-1">
                  home
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/add-note"} className="hover:underline">
                <Button variant="link" className="capitalize p-1">
                  add note
                </Button>
              </Link>
            </li>
          </>
        )}
        {/* theme toggle */}

        {user && (
          <div className="flex items-center gap-2">
            <small className="text-sm font-medium text-muted-foreground leading-none capitalize">
              Welcome {user.name || "User"}
            </small>
            <Popover>
              <PopoverTrigger>
                <div className="border-2 border-primary rounded-full w-9 h-9 hover:cursor-pointer">
                  <p className="text-xl text-muted-foreground capitalize text-center">
                    {user.name ? user.name.slice(0, 1) : "U"}{" "}
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="max-w-max flex flex-col gap-2 p-2">
                <small className="text-sm font-medium text-muted-foreground leading-none">
                  {user.email}
                </small>
                <hr />
                <Link to={"/user-profile"} className="hover:underline">
                  <Button variant="ghost" className="icon-btn">
                    profile <User className="w-4" />
                  </Button>
                </Link>
                <hr />
                <Button className="icon-btn" onClick={handleLogout}>
                  logout <LogOut className="w-4" />
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
        <ModeToggle />
      </ul>

      {/* on mobile screen */}
      <MobileNavbar handleLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
