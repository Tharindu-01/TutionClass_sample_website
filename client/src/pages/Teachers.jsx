
import { useState } from "react";
import { Link } from "react-router";
import { teachers } from "../data/teachers";

function Teachers() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");

  const subjects = [
    "All",
    ...new Set(teachers.map((teacher) => teacher.subject))
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subject === "All" || teacher.subject === subject;

    return matchesSearch && matchesSubject;
  });

  return (
    <main className="teachers-page">
      <div className="teachers-heading">
        <span className="teachers-label">OUR EDUCATORS</span>
        <h2>Meet Our Teachers</h2>
        <p>
          Explore our teaching team and find the right
          educator for your subject.
        </p>
      </div>

      <div className="teachers-filters">
        <input
          type="text"
          placeholder="Search by teacher or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
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

      <p className="teachers-count">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </p>

      <div className="teachers-grid">
        {filteredTeachers.map((teacher) => (
          <div className="teacher-card" key={teacher.id}>
            <div className="teacher-avatar">
              {teacher.image ? (
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="teacher-photo"
                />
              ) : (
                <span>{teacher.name.charAt(0)}</span>
              )}
            </div>

            <div className="teacher-content">
              <span className="teacher-subject">
                {teacher.subject}
              </span>

              <h3>{teacher.name}</h3>

              <p className="teacher-qualification">
                {teacher.qualification}
              </p>

              <p className="teacher-grades">
                {teacher.grades}
              </p>

              <Link
                to={`/teachers/${teacher.id}`}
                className="teacher-button"
              >
                View Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="teachers-empty">
          <h3>No teachers found</h3>
          <p>Try another name or subject.</p>
          <button
            onClick={() => {
              setSearch("");
              setSubject("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default Teachers;
