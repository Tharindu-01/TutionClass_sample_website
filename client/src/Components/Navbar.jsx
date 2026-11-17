
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/nextgen-logo.png";
import "./Navbar.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Classes", path: "/classes" },
  { name: "Teachers", path: "/teachers" },
  { name: "Timetable", path: "/timetable" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="navbar-inner">

        {/* Academy Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="NextGen Education Academy Home"
        >
          <span className="navbar-logo-frame">
            <img
              src={logo}
              alt="NextGen Education Academy"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>{item.name}</span>
              <span
                className="nav-active-line"
                aria-hidden="true"
              />
            </NavLink>
          ))}
        </nav>

        {/* Desktop Login / Register */}
        <div className="nav-auth">

          <NavLink
            to="/login"
            className="nav-login"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="nav-register"
          >
            <span>Get Started</span>

            <span
              className="nav-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </NavLink>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`menu-toggle ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* Mobile Navigation */}
      <nav
        id="main-navigation"
        className={`mobile-nav-panel ${
          menuOpen ? "open" : ""
        }`}
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-nav-item ${
                isActive ? "active" : ""
              }`
            }
            style={{
              "--item-index": index,
            }}
          >
            <span>{item.name}</span>
            <span aria-hidden="true">↗</span>
          </NavLink>
        ))}

        {/* Mobile Login / Register */}
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
            Get Started ↗
          </NavLink>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
