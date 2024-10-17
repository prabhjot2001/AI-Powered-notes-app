import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "@/data/NavbarLinks";
import { ModeToggle } from "./ModeToggle";
import * as React from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between p-2 border-b sticky top-0 bg-background z-10">
      <div>
        <Logo />
      </div>

      {/* on big screen */}
      <ul className="hidden md:flex gap-2">
        {NavLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.path} className="hover:underline decoration-primary">
              <Button>{link.link}</Button>
            </Link>
          </li>
        ))}
        <ModeToggle />
      </ul>

      {/* on mobile screen */}
      <div className="md:hidden">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <Menu />
        </Button>
      </div>

      {/* sidebar for mobile devices */}
      {isSidebarOpen && (
        <aside className="z-20 fixed top-0 left-0 bg-primary-foreground h-screen w-[60%] border-r overflow-y-auto">
          <div className="border-b flex justify-between p-2">
            <Logo />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-4" />
            </Button>
          </div>
          <ul className="space-y-2 p-4">
            {NavLinks.map((link, idx) => (
              <li key={idx} onClick={()=>{setIsSidebarOpen(false)}}>
                <Link
                  to={link.path}
                  className="hover:underline decoration-primary"
                >
                  <Button className="w-full">{link.link}</Button>
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between">
              Apperance <ModeToggle />
            </li>
          </ul>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
