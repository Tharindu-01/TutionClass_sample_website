import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/nextgen-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
  <img
    src={logo}
    alt="NextGen Education Academy"
  />
</Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav
        id="main-navigation"
        className={`nav-links ${menuOpen ? "open" : ""}`}
      >
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/classes" onClick={closeMenu}>Classes</NavLink>
        <NavLink to="/timetable" onClick={closeMenu}>Timetable</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </nav>

      <NavLink
        to="/classes"
        className="nav-button"
        onClick={closeMenu}
      >
        Explore Classes
      </NavLink>
    </header>
  );
}

export default Navbar;