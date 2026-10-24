
import { useState } from 'react'
import { classes } from '../data/classes'

function Timetable() {
  const [selectedGrade, setSelectedGrade] = useState(10)

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  const filteredClasses = classes
    .filter((item) => item.grade === selectedGrade)
    .sort((a, b) => {
      return days.indexOf(a.day) - days.indexOf(b.day)
    })

  return (
    <section className="page-section timetable-page">
      <h1>Class Timetable</h1>
      <p>Find your Grade 10 and Grade 11 class schedules.</p>

      <div className="filter-buttons">
        <button
          className={selectedGrade === 10 ? 'active' : ''}
          onClick={() => setSelectedGrade(10)}
        >
          Grade 10
        </button>

        <button
          className={selectedGrade === 11 ? 'active' : ''}
          onClick={() => setSelectedGrade(11)}
        >
          Grade 11
        </button>
      </div>

      <div className="table-wrapper">
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Hall</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.map((item) => (
              <tr key={item.id}>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.subject}</td>
                <td>{item.teacher}</td>
                <td>{item.hall}</td>
                <td>{item.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredClasses.length === 0 && (
        <p>No classes available for this grade.</p>
      )}
    </section>
  )
}

export default Timetable
