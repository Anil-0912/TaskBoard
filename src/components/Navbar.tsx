import logo from "../assets/logoTask.png";
import { ThemeProps } from "../types/task";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, toggleTheme }: ThemeProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="TaskBoard Logo" />
      </div>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;