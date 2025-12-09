import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul className="flex space-x-6 text-lg text-[#efefd1]">
        <li>
          <Link to="/map" className="hover:underline">
            Analyzer
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
