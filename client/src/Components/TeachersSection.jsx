
import { Link } from "react-router";
import { teachers } from "../data/teachers";

function TeachersSection() {
  return (
    <section className="teachers-section">
      <div className="teachers-heading">
        <span className="teachers-label">OUR EDUCATORS</span>
        <h2>Meet Our Teachers</h2>
        <p>
          Meet the educators supporting our students
          throughout their learning journey.
        </p>
      </div>

      <div className="teachers-grid">
        {teachers.map((teacher) => (
          <div className="teacher-card" key={teacher.id}>
            <div className="teacher-avatar">
              {teacher.image ? (
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="teacher-photo"
                />
              ) : (
                <span>
                  {teacher.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
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
    </section>
  );
}

export default TeachersSection;
