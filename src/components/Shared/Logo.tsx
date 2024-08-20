import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="btn btn-ghost text-lg">
      <img src="/logo3.png" alt="" className="h-8" />
    </Link>
  );
};

export default Logo;
