
import { useState } from "react";
import { classes } from "../data/classes";
import ClassCard from "../Components/ClassCard";

function Classes() {
  const [grade, setGrade] = useState(10);
  const [subject, setSubject] = useState("All");
  const [search, setSearch] = useState("");

  const gradeClasses = classes.filter(
    (item) => Number(item.grade) === grade
  );

  const subjects = [
    "All",
    ...new Set(gradeClasses.map((item) => item.subject)),
  ];

  const filteredClasses = gradeClasses.filter((item) => {
    const matchesSubject =
      subject === "All" || item.subject === subject;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      item.subject.toLowerCase().includes(query) ||
      item.teacher.toLowerCase().includes(query);

    return matchesSubject && matchesSearch;
  });

  const changeGrade = (value) => {
    setGrade(value);
    setSubject("All");
    setSearch("");
  };

  const resetFilters = () => {
    changeGrade(10);
  };

  return (
    <section className="nextgen-classes-page">
      <div className="nextgen-classes-container">

        <div className="nextgen-classes-heading">
          <h1>Explore Our Classes</h1>
          <p>
            Discover quality education for Grade 10
            and Grade 11 students.
          </p>
        </div>

        <div className="nextgen-grade-tabs">
          <button
            type="button"
            className={grade === 10 ? "active" : ""}
            onClick={() => changeGrade(10)}
          >
            Grade 10
          </button>

          <button
            type="button"
            className={grade === 11 ? "active" : ""}
            onClick={() => changeGrade(11)}
          >
            Grade 11
          </button>
        </div>

        <div className="nextgen-filters">
          <div className="nextgen-filter-field">
            <label htmlFor="nextgen-subject">
              Select Subject
            </label>

            <select
              id="nextgen-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Subjects" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="nextgen-filter-field">
            <label htmlFor="nextgen-search">
              Search Classes
            </label>

            <input
              id="nextgen-search"
              type="search"
              placeholder="Search subject or teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="nextgen-results">
          <p>
            Showing <strong>{filteredClasses.length}</strong>{" "}
            {filteredClasses.length === 1
              ? "class"
              : "classes"}
          </p>

          <button type="button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="nextgen-classes-grid">
          {filteredClasses.map((item) => (
            <ClassCard
              key={item.id}
              classData={item}
            />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <p className="nextgen-empty">
            No matching classes found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Classes;
