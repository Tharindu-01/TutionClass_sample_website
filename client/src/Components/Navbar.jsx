
import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/nextgen-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      {/* Academy Logo */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="NextGen Education Academy"
        />
      </Link>

      {/* Mobile Menu Button */}
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

      {/* Navigation Links */}
      <nav
        id="main-navigation"
        className={`nav-links ${menuOpen ? "open" : ""}`}
      >
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/classes" onClick={closeMenu}>
          Classes
        </NavLink>

        <NavLink to="/teachers" onClick={closeMenu}>
          Teachers
        </NavLink>

        <NavLink to="/timetable" onClick={closeMenu}>
          Timetable
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* Mobile Authentication Buttons */}
        <div className="mobile-auth">
          <NavLink
            to="/login"
            className="mobile-login"
            onClick={closeMenu}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="mobile-register"
            onClick={closeMenu}
          >
            Register
          </NavLink>
        </div>
      </nav>

      {/* Desktop Authentication Buttons */}
      <div className="nav-auth">
        <NavLink
          to="/login"
          className="nav-login"
          onClick={closeMenu}
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className="nav-register"
          onClick={closeMenu}
        >
          Get Started
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
