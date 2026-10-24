
import { NavLink } from 'react-router'

function Navbar() {
  return (
    <header className="navbar">
      <h2>EduClass</h2>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/classes">Classes</NavLink>
        <NavLink to="/timetable">Timetable</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <NavLink to="/classes" className="nav-button">
        Explore Classes
      </NavLink>
    </header>
  )
}

export default Navbar
