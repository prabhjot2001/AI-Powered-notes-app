import { House, User, Plus } from "lucide-react";

const AuthenticatedUserNavbarLinks = [
  {
    link: "home",
    path: "/",
    onClick: () => {},
    icon: <House className="w-4" />,
  },
  {
    link: "add note",
    path: "/add-note",
    onClick: () => {},
    icon: <Plus className="w-4" />,
  },

  {
    link: "profile",
    path: "/user-profile",
    onClick: () => {},
    icon: <User className="w-4" />,
  },
];

export default AuthenticatedUserNavbarLinks;
