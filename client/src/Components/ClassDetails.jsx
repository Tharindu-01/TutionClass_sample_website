
import { useState } from 'react'
import { Link } from 'react-router'
import { classes } from '../data/classes'

function ClassDetails() {
  const [selectedGrade, setSelectedGrade] = useState(10)
  const [selectedSubject, setSelectedSubject] = useState('All')

  const gradeClasses = classes.filter(
    (item) => item.grade === selectedGrade
  )

  const subjects = [
    'All',
    ...new Set(gradeClasses.map((item) => item.subject))
  ]

  const filteredClasses = gradeClasses.filter(
    (item) =>
      selectedSubject === 'All' ||
      item.subject === selectedSubject
  )

  function changeGrade(grade) {
    setSelectedGrade(grade)
    setSelectedSubject('All')
  }

  return (
    <section className="classes">
        
      <h2>Explore Our Classes</h2>
      <p>Select your grade and subject to view class details.</p>

      <div className="filter-buttons">
        <button
          className={selectedGrade === 10 ? 'active' : ''}
          onClick={() => changeGrade(10)}
        >
          Grade 10
        </button>

        <button
          className={selectedGrade === 11 ? 'active' : ''}
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
              {subject === 'All' ? 'All Subjects' : subject}
            </option>
          ))}
        </select>
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
        <p>No classes available.</p>
      )}
    </section>
  )
}

export default ClassDetails
