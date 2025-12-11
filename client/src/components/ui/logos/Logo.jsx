import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
    >
      E-Store
    </Link>
  );
}

export default Logo
