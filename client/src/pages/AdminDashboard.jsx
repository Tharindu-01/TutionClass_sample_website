
import { useState } from "react";
import { Link } from "react-router";
import { classes } from "../data/classes";
import { teachers } from "../data/teachers";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  // Demo student records only
  const students = [
    { id: 1, name: "Demo Student One", regNo: "NG-001", grade: 10 },
    { id: 2, name: "Demo Student Two", regNo: "NG-002", grade: 11 },
    { id: 3, name: "Demo Student Three", regNo: "NG-003", grade: 10 }
  ];

  const menu = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "teachers", label: "Teachers", icon: "🎓" },
    { id: "classes", label: "Classes", icon: "📚" },
    { id: "timetable", label: "Timetable", icon: "📅" }
  ];

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearch("");
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.regNo} ${student.grade}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.name} ${teacher.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredClasses = classes.filter((item) =>
    `${item.subject} ${item.teacher} ${item.grade}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span>✦</span>
          <div>
            <strong>NextGen</strong>
            <small>Admin Control Center</small>
          </div>
        </div>

        <p className="admin-menu-label">MANAGEMENT</p>

        <nav className="admin-nav">
          {menu.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeTab === item.id ? "active" : ""}
              onClick={() => switchTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/">← Back to Website</Link>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">
              ACADEMY MANAGEMENT
            </span>
            <h1>
              {menu.find((item) => item.id === activeTab)?.label}
            </h1>
            <p>
              Manage your academy from one central workspace.
            </p>
          </div>

          <div className="admin-profile">
            <span className="admin-avatar">A</span>
            <div>
              <strong>Demo Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {activeTab === "overview" && (
          <>
            <div className="admin-welcome">
              <div>
                <span>ADMIN CONTROL CENTER</span>
                <h2>Welcome back, Admin! 👋</h2>
                <p>
                  Here is a quick overview of your academy.
                </p>
              </div>
              <button onClick={() => switchTab("classes")}>
                Manage Classes →
              </button>
            </div>

            <div className="admin-stats">
              <div className="admin-stat-card">
                <span>👥</span>
                <h3>{students.length}</h3>
                <p>Demo Students</p>
              </div>

              <div className="admin-stat-card">
                <span>🎓</span>
                <h3>{teachers.length}</h3>
                <p>Teachers</p>
              </div>

              <div className="admin-stat-card">
                <span>📚</span>
                <h3>{classes.length}</h3>
                <p>Classes</p>
              </div>

              <div className="admin-stat-card">
                <span>📅</span>
                <h3>{classes.length}</h3>
                <p>Weekly Sessions</p>
              </div>
            </div>

            <div className="admin-panel">
              <h3>Quick Management</h3>
              <div className="admin-quick-grid">
                {menu.slice(1).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => switchTab(item.id)}
                  >
                    <span>{item.icon}</span>
                    <strong>{item.label}</strong>
                    <small>View records →</small>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab !== "overview" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>
                  {menu.find(
                    (item) => item.id === activeTab
                  )?.label} Management
                </h3>
                <p>
                  View and search available records.
                </p>
              </div>

              <input
                type="search"
                placeholder="Search records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  {activeTab === "students" && (
                    <tr>
                      <th>Registration No.</th>
                      <th>Student Name</th>
                      <th>Grade</th>
                    </tr>
                  )}

                  {activeTab === "teachers" && (
                    <tr>
                      <th>Teacher Name</th>
                      <th>Subject</th>
                      <th>Qualification</th>
                    </tr>
                  )}

                  {activeTab === "classes" && (
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      <th>Teacher</th>
                      <th>Mode</th>
                    </tr>
                  )}

                  {activeTab === "timetable" && (
                    <tr>
                      <th>Subject</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Hall</th>
                    </tr>
                  )}
                </thead>

                <tbody>
                  {activeTab === "students" &&
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.regNo}</td>
                        <td>{student.name}</td>
                        <td>Grade {student.grade}</td>
                      </tr>
                    ))}

                  {activeTab === "teachers" &&
                    filteredTeachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.subject}</td>
                        <td>{teacher.qualification}</td>
                      </tr>
                    ))}

                  {activeTab === "classes" &&
                    filteredClasses.map((item) => (
                      <tr key={item.id}>
                        <td>{item.subject}</td>
                        <td>Grade {item.grade}</td>
                        <td>{item.teacher}</td>
                        <td>{item.mode}</td>
                      </tr>
                    ))}

                  {activeTab === "timetable" &&
                    filteredClasses.map((item) => (
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

            {(
              (activeTab === "students" && filteredStudents.length === 0) ||
              (activeTab === "teachers" && filteredTeachers.length === 0) ||
              ((activeTab === "classes" || activeTab === "timetable") &&
                filteredClasses.length === 0)
            ) && (
              <p className="admin-empty">
                No matching records found.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
