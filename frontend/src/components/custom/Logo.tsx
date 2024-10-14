import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <p className="text-lg font-semibold">Notes</p>
    </Link>
  );
};

export default Logo;
