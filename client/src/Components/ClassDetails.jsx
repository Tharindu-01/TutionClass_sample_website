import { useState } from "react";
import { Link } from "react-router";
import { classes } from "../data/classes";

function ClassDetails() {
  const [selectedGrade, setSelectedGrade] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter classes by grade
  const gradeClasses = classes.filter(
    (item) => item.grade === selectedGrade
  );

  // Get subjects for selected grade
  const subjects = [
    "All",
    ...new Set(gradeClasses.map((item) => item.subject)),
  ];

  // Filter by subject and search text
  const filteredClasses = gradeClasses.filter((item) => {
    const matchesSubject =
      selectedSubject === "All" ||
      item.subject === selectedSubject;

    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      item.subject.toLowerCase().includes(search) ||
      item.teacher.toLowerCase().includes(search);

    return matchesSubject && matchesSearch;
  });

  function changeGrade(grade) {
    setSelectedGrade(grade);
    setSelectedSubject("All");
    setSearchTerm("");
  }

  return (
    <section className="classes">
      <h2>Explore Our Classes</h2>
      <p>Select your grade and find your classes.</p>

      <div className="filter-buttons">
        <button
          className={selectedGrade === 10 ? "active" : ""}
          onClick={() => changeGrade(10)}
        >
          Grade 10
        </button>

        <button
          className={selectedGrade === 11 ? "active" : ""}
          onClick={() => changeGrade(11)}
        >
          Grade 11
        </button>
      </div>

      <div className="subject-filter">
        <label htmlFor="subject">Select Subject</label>

        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject === "All" ? "All Subjects" : subject}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="class-search">
        <label htmlFor="class-search-input">
          Search Classes
        </label>

        <input
          id="class-search-input"
          type="search"
          placeholder="Search subject or teacher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="class-grid">
        {filteredClasses.map((item) => (
          <div className="class-card" key={item.id}>
            <h3>{item.subject}</h3>

            <p><strong>Grade:</strong> {item.grade}</p>
            <p><strong>Teacher:</strong> {item.teacher}</p>
            <p><strong>Day:</strong> {item.day}</p>
            <p><strong>Time:</strong> {item.time}</p>
            <p><strong>Hall:</strong> {item.hall}</p>
            <p><strong>Mode:</strong> {item.mode}</p>

            <Link
              to={`/classes/${item.id}`}
              className="primary-button"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <p>No matching classes found.</p>
      )}
    </section>
  );
}

export default ClassDetails;