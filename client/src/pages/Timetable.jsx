
import { useState } from "react";
import { Link } from "react-router";
import { classes } from "../data/classes";

function Timetable() {
  const [selectedGrade, setSelectedGrade] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Filter by grade and search
  const filteredClasses = classes
    .filter((item) => {
      const matchesGrade = item.grade === selectedGrade;

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        item.subject.toLowerCase().includes(search) ||
        item.teacher.toLowerCase().includes(search);

      return matchesGrade && matchesSearch;
    })
    .sort((a, b) => {
      return days.indexOf(a.day) - days.indexOf(b.day);
    });

  function changeGrade(grade) {
    setSelectedGrade(grade);
    setSearchTerm("");
  }

  return (
    <section className="timetable-page">
      <div className="timetable-heading">
        <h1>Class Timetable</h1>
        <p>
          Find your class schedule at
          NextGen Education Academy.
        </p>
      </div>

      {/* Grade Filter */}
      <div className="filter-buttons">
        <button
          type="button"
          className={selectedGrade === 10 ? "active" : ""}
          onClick={() => changeGrade(10)}
        >
          Grade 10
        </button>

        <button
          type="button"
          className={selectedGrade === 11 ? "active" : ""}
          onClick={() => changeGrade(11)}
        >
          Grade 11
        </button>
      </div>

      {/* Search */}
      <div className="class-search">
        <label htmlFor="timetable-search">
          Search Timetable
        </label>

        <input
          id="timetable-search"
          type="search"
          placeholder="Search subject or teacher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results Count */}
      <p className="timetable-count">
        Showing {filteredClasses.length}{" "}
        {filteredClasses.length === 1 ? "class" : "classes"}
      </p>

      {/* Timetable */}
      <div className="timetable-wrapper">
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Time</th>
              <th>Hall</th>
              <th>Mode</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.map((item) => (
              <tr key={item.id}>
                <td>{item.day}</td>
                <td className="subject-name">{item.subject}</td>
                <td>{item.teacher}</td>
                <td>{item.time}</td>
                <td>{item.hall}</td>
                <td>{item.mode}</td>
                <td>
                  <Link
                    to={`/classes/${item.id}`}
                    className="timetable-link"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredClasses.length === 0 && (
          <p className="no-results">
            No matching classes found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Timetable;
