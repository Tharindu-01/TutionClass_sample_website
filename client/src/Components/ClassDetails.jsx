
import { useState } from "react";
import { classes } from "../data/classes";
import ClassCard from "../Components/ClassCard";
import "./ClassDetails.css";

function ClassDetails() {
  const [selectedGrade, setSelectedGrade] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter by selected grade
  const gradeClasses = classes.filter(
    (item) => Number(item.grade) === selectedGrade
  );

  // Subjects for selected grade
  const subjects = [
    "All",
    ...new Set(gradeClasses.map((item) => item.subject)),
  ];

  // Filter by subject and search
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

  // Change grade
  function changeGrade(grade) {
    setSelectedGrade(grade);
    setSelectedSubject("All");
    setSearchTerm("");
  }

  // Reset filters
  function resetFilters() {
    setSelectedGrade(10);
    setSelectedSubject("All");
    setSearchTerm("");
  }

  return (
  
    <section className="classes ng-classes-section">
    <h1 style={{ color: "red", fontSize: "40px" }}>
      CLASS DETAILS TEST 123
    </h1>
      <div className="ng-classes-container">

        {/* Heading */}
        <div className="ng-classes-heading">
          <h2>
            Explore Our <span>Classes</span>
          </h2>
          <p>Select your grade and find your classes.</p>
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

        {/* Subject Filter */}
        <div className="subject-filter">
          <label htmlFor="subject">
            Select Subject
          </label>

          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value)
            }
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === "All"
                  ? "All Subjects"
                  : subject}
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
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        {/* Results */}
        <div className="class-results">
          <p>
            Showing <strong>{filteredClasses.length}</strong>{" "}
            {filteredClasses.length === 1
              ? "class"
              : "classes"}
          </p>

          <button
            type="button"
            className="reset-button"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        {/* Premium Blue Gradient Cards */}
        <div className="ng-classes-grid">
          {filteredClasses.map((item) => (
            <ClassCard
              key={item.id}
              classData={item}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredClasses.length === 0 && (
          <p className="no-results">
            No matching classes found.
          </p>
        )}

      </div>
    </section>
  );
}

export default ClassDetails;
