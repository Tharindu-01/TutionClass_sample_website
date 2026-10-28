
import { Link, useParams } from "react-router";
import { teachers } from "../data/teachers";
import { classes } from "../data/classes";

function TeacherProfile() {
  const { id } = useParams();

  const teacher = teachers.find(
    (item) => item.id === Number(id)
  );

  if (!teacher) {
    return (
      <section className="teacher-profile-page">
        <h2>Teacher Not Found</h2>
        <Link to="/">Back to Home</Link>
      </section>
    );
  }

 const teacherClasses = classes.filter(
  (item) => item.teacherId === teacher.id
);

  return (
    <main className="teacher-profile-page">
      <Link to="/" className="profile-back">
        ← Back to Home
      </Link>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {teacher.image ? (
              <img src={teacher.image} alt={teacher.name} />
            ) : (
              <span>
                {teacher.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
            )}
          </div>

          <div>
            <span className="teacher-subject">
              {teacher.subject}
            </span>
            <h1>{teacher.name}</h1>
            <p>{teacher.qualification}</p>
            <p>{teacher.grades}</p>
          </div>
        </div>

        <div className="profile-about">
          <h2>About the Teacher</h2>
          <p>{teacher.description}</p>
        </div>

        <div className="profile-about">
          <h2>Available Classes</h2>

          {teacherClasses.length > 0 ? (
            <div className="profile-class-list">
              {teacherClasses.map((item) => (
                <div className="profile-class" key={item.id}>
                  <div>
                    <h3>
                      Grade {item.grade} - {item.subject}
                    </h3>
                    <p>
                      {item.day} | {item.time}
                    </p>
                  </div>

                  <Link to={`/classes/${item.id}`}>
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No classes are currently linked to this
              teacher profile.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default TeacherProfile;
