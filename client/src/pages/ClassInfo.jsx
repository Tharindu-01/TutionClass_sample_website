
import { useParams, Link } from 'react-router'
import { classes } from '../data/classes'

function ClassInfo() {
  const { id } = useParams()

  const selectedClass = classes.find(
    (item) => String(item.id) === id
  )

  if (!selectedClass) {
    return (
      <section className="page-section">
        <h1>Class Not Found</h1>
        <p>Sorry, this class is not available.</p>

        <Link to="/classes" className="primary-button">
          Back to Classes
        </Link>
      </section>
    )
  }

  return (
    <section className="page-section class-info-page">
      <Link to="/classes" className="back-link">
        ← Back to Classes
      </Link>

      <h1>{selectedClass.subject}</h1>
      <p>Grade {selectedClass.grade}</p>

      <div className="class-info-card">
        <h2>Class Information</h2>

        <p><strong>Subject:</strong> {selectedClass.subject}</p>
        <p><strong>Teacher:</strong> {selectedClass.teacher}</p>
        <p><strong>Day:</strong> {selectedClass.day}</p>
        <p><strong>Time:</strong> {selectedClass.time}</p>
        <p><strong>Hall:</strong> {selectedClass.hall}</p>
        <p><strong>Class Mode:</strong> {selectedClass.mode}</p>
        <p><strong>Contact:</strong> {selectedClass.phone}</p>
      </div>
    </section>
  )
}

export default ClassInfo
