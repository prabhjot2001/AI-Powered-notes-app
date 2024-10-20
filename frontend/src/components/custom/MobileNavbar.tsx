import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import NavLinks from "@/data/NavbarLinks";
import { ModeToggle } from "./ModeToggle";
import { useAuthContext } from "@/hooks/useAuthContext";
import AuthenticatedUserNavbarLinks from "@/data/AuthenticatedUserNavbarLinks";

const MobileNavbar = ({ handleLogout }) => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setOpen(true)}>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription>
              <div className="space-y-2 p-4">
                {!user &&
                  NavLinks.map((link, idx) => (
                    <div key={idx}>
                      <Link to={link.path} onClick={handleLinkClick}>
                        <Button
                          variant={"secondary"}
                          className="w-full capitalize"
                        >
                          {link.link}
                        </Button>
                      </Link>
                    </div>
                  ))}

                {user && (
                  <div className="mb-4">
                    <p className="capitalize text-sm font-medium text-muted-foreground">
                      Welcome {user.name ? user.name : "User"}
                    </p>
                    <hr />
                  </div>
                )}

                {user &&
                  AuthenticatedUserNavbarLinks.map((link, idx) => (
                    <div key={idx}>
                      <Link to={link.path} onClick={handleLinkClick}>
                        <Button
                          variant={"secondary"}
                          className="w-full capitalize"
                        >
                          {link.link}
                        </Button>
                      </Link>
                    </div>
                  ))}

                {user && (
                  <div className="pt-4">
                    <Button
                      className="capitalize w-full"
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                    >
                      logout
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  Appearance <ModeToggle />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
