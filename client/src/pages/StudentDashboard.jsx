
import { useState } from "react";
import { Link } from "react-router";
import { classes } from "../data/classes";

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Temporary demo student
  // Replace with authenticated user data later
  const student = {
    name: "Demo Student",
    registrationNumber: "NG-2026-001",
    grade: 10,
    email: "demo@example.com",
    enrolledClassIds: [1, 2, 3]
  };

  const enrolledClasses = classes.filter((item) =>
    student.enrolledClassIds.includes(item.id)
  );

  const menuItems = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "classes", label: "My Classes", icon: "▤" },
    { id: "timetable", label: "Timetable", icon: "▦" },
    { id: "profile", label: "My Profile", icon: "◉" }
  ];

  return (
    <main className="student-dashboard">
      <aside className="student-sidebar">
        <div className="student-sidebar-brand">
          <span className="student-brand-icon">✦</span>
          <div>
            <strong>NextGen</strong>
            <small>Student Portal</small>
          </div>
        </div>

        <p className="student-sidebar-label">MAIN MENU</p>

        <nav className="student-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                activeTab === item.id ? "active" : ""
              }
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="student-sidebar-bottom">
          <Link to="/">← Back to Website</Link>
        </div>
      </aside>

      <section className="student-main">
        <header className="student-topbar">
          <div>
            <span className="student-eyebrow">
              NEXTGEN STUDENT PORTAL
            </span>
            <h2>
              {activeTab === "overview"
                ? "Dashboard Overview"
                : menuItems.find(
                    (item) => item.id === activeTab
                  )?.label}
            </h2>
          </div>

          <div className="student-topbar-user">
            <span className="student-user-avatar">
              {student.name.charAt(0)}
            </span>
            <div>
              <strong>{student.name}</strong>
              <small>Grade {student.grade}</small>
            </div>
          </div>
        </header>

        {activeTab === "overview" && (
          <>
            <div className="student-welcome">
              <div>
                <span>YOUR LEARNING SPACE</span>
                <h1>Welcome back, {student.name}! 👋</h1>
                <p>
                  Keep learning, stay organized and
                  make progress towards your goals.
                </p>
              </div>
              <Link to="/classes">Explore Classes →</Link>
            </div>

            <div className="student-stats">
              <div className="student-stat-card">
                <span>📚</span>
                <h3>{enrolledClasses.length}</h3>
                <p>Enrolled Classes</p>
              </div>

              <div className="student-stat-card">
                <span>🎓</span>
                <h3>{student.grade}</h3>
                <p>Current Grade</p>
              </div>

              <div className="student-stat-card">
                <span>📅</span>
                <h3>{enrolledClasses.length}</h3>
                <p>Weekly Class Sessions</p>
              </div>

              <div className="student-stat-card">
                <span>⭐</span>
                <h3>
                  {new Set(
                    enrolledClasses.map((c) => c.subject)
                  ).size}
                </h3>
                <p>Subjects</p>
              </div>
            </div>

            <div className="student-panel">
              <div className="student-panel-heading">
                <h3>My Classes</h3>
                <button
                  onClick={() => setActiveTab("classes")}
                >
                  View All →
                </button>
              </div>

              <div className="student-class-list">
                {enrolledClasses.map((item) => (
                  <div
                    className="student-class-item"
                    key={item.id}
                  >
                    <div className="student-class-icon">
                      📖
                    </div>

                    <div>
                      <h4>{item.subject}</h4>
                      <p>
                        {item.teacher} • {item.day}
                      </p>
                    </div>

                    <Link to={`/classes/${item.id}`}>
                      Details →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "classes" && (
          <div className="student-panel">
            <h3>My Enrolled Classes</h3>

            <div className="student-class-list">
              {enrolledClasses.map((item) => (
                <div
                  className="student-class-item"
                  key={item.id}
                >
                  <div className="student-class-icon">
                    📚
                  </div>

                  <div>
                    <h4>{item.subject}</h4>
                    <p>{item.teacher}</p>
                    <p>{item.day} • {item.time}</p>
                  </div>

                  <Link to={`/classes/${item.id}`}>
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "timetable" && (
          <div className="student-panel">
            <h3>My Weekly Timetable</h3>

            <div className="student-table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Hall</th>
                  </tr>
                </thead>

                <tbody>
                  {enrolledClasses.map((item) => (
                    <tr key={item.id}>
                      <td>{item.subject}</td>
                      <td>{item.day}</td>
                      <td>{item.time}</td>
                      <td>{item.hall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="student-panel">
            <h3>Student Profile</h3>

            <div className="student-profile-grid">
              <div>
                <span>Full Name</span>
                <strong>{student.name}</strong>
              </div>

              <div>
                <span>Registration Number</span>
                <strong>
                  {student.registrationNumber}
                </strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{student.email}</strong>
              </div>

              <div>
                <span>Grade</span>
                <strong>Grade {student.grade}</strong>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default StudentDashboard;
