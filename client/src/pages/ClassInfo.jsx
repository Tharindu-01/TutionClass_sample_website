
import { Link, useParams } from "react-router";
import { classes } from "../data/classes";

function ClassInfo() {
  // Get class ID from the URL
  const { id } = useParams();

  // Find the selected class
  const selectedClass = classes.find(
    (item) => String(item.id) === id
  );

  // If class does not exist
  if (!selectedClass) {
    return (
      <section className="class-info-page">
        <h2>Class Not Found</h2>
        <p>The requested class is not available.</p>
        <Link to="/classes" className="primary-button">
          Back to Classes
        </Link>
      </section>
    );
  }

  return (
    <section className="class-info-page">
      <Link to="/classes" className="back-link">
        ← Back to Classes
      </Link>

      <div className="class-info-container">
        <div className="class-info-header">
          <span className="grade-badge">
            Grade {selectedClass.grade}
          </span>

          <h1>{selectedClass.subject}</h1>
          <p>NextGen Education Academy</p>
        </div>

        <div className="class-info-grid">
          <div className="info-item">
            <h4>Teacher</h4>
            <p>{selectedClass.teacher}</p>
          </div>

          <div className="info-item">
            <h4>Day</h4>
            <p>{selectedClass.day}</p>
          </div>

          <div className="info-item">
            <h4>Time</h4>
            <p>{selectedClass.time}</p>
          </div>

          <div className="info-item">
            <h4>Hall</h4>
            <p>{selectedClass.hall}</p>
          </div>

          <div className="info-item">
            <h4>Class Mode</h4>
            <p>{selectedClass.mode}</p>
          </div>

          <div className="info-item">
            <h4>Contact Number</h4>
            <p>{selectedClass.phone}</p>
          </div>
        </div>

        <div className="class-about">
          <h3>About This Class</h3>
          <p>
            Join our {selectedClass.subject} class for
            Grade {selectedClass.grade} students at
            NextGen Education Academy.
          </p>
        </div>

        <div className="class-info-actions">
          <a
            href={`tel:${selectedClass.phone}`}
            className="primary-button"
          >
            Contact Teacher
          </a>

          <Link to="/timetable" className="outline-button">
            View Timetable
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ClassInfo;
