import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CgMenuHotdog } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import companyLogo from "../../images/error-type-logo-icon-free-vector.jpg";
import "./index.css";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/">
        <img src={companyLogo} className="website-logo" alt="website logo" />
      </Link>
      <ul className="sm-screen-nav-links">
        <Link to="/">
          <li>
            <AiFillHome size="30" color="#ffffff" />
          </li>
        </Link>
        <Link to="/files">
          <li>
            <CgMenuHotdog size="30" color="#ffffff" />
          </li>
        </Link>
        <li>
          <button type="button" className="sm-screen-logout-button">
            <FiLogOut size="30" color="#ffffff" />
          </button>
        </li>
      </ul>
      <ul className="lg-screen-nav-links">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/files" className="nav-link">
          <li>Files</li>
        </Link>
      </ul>
      <button type="button" className="lg-screen-logout-button">
        Logout
      </button>
    </div>
  );
};

export default Header;