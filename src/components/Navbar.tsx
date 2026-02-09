import logo from "../assets/logoTask.png";
import { ThemeProps } from "../types/task";

const Navbar = ({ darkMode, toggleTheme }: ThemeProps) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="TaskBoard Logo" />
      </div>

      <button
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};

export default Navbar;
