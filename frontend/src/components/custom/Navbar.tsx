import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "@/data/NavbarLinks";
import { ModeToggle } from "./ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
      <div>
        <Logo />
      </div>

      {/* on big screen */}
      <ul className="hidden md:flex gap-2">
        {NavLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.path} className="hover:underline decoration-primary">
              <Button className="capitalize">{link.link}</Button>
            </Link>
          </li>
        ))}
        <ModeToggle />
      </ul>

      {/* on mobile screen */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription>
                <ul className="space-y-2 p-4">
                  {NavLinks.map((link, idx) => (
                    <li key={idx} onClick={() => {}}>
                      <Link to={link.path}>
                        <Button
                          variant={"secondary"}
                          className="w-full capitalize"
                        >
                          {link.link}
                        </Button>
                      </Link>
                    </li>
                  ))}
                  <li className="flex items-center justify-between">
                    Appearance <ModeToggle />
                  </li>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
