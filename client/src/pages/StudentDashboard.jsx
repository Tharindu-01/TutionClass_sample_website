
import { useState } from "react";
import { Link } from "react-router";
import { classes } from "../data/classes";

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Temporary demo student
  // Replace with authenticated student data later
  const student = {
    name: "Demo Student",
    registrationNumber: "NG-2026-001",
    grade: 10,
    email: "demo@example.com",
    enrolledClassIds: [1, 2, 3]
  };

  // Temporary demo payment data
  const payments = [
    {
      id: 1,
      subject: "Mathematics",
      month: "November 2026",
      amount: 2000,
      status: "Paid"
    },
    {
      id: 2,
      subject: "Science",
      month: "November 2026",
      amount: 2000,
      status: "Pending"
    },
    {
      id: 3,
      subject: "English",
      month: "November 2026",
      amount: 1500,
      status: "Paid"
    }
  ];

  const enrolledClasses = classes.filter((item) =>
    student.enrolledClassIds.includes(item.id)
  );

  const menuItems = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "classes", label: "My Classes", icon: "▤" },
    { id: "timetable", label: "Timetable", icon: "▦" },
    { id: "payments", label: "My Payments", icon: "💳" },
    { id: "profile", label: "My Profile", icon: "◉" }
  ];

  const paidCount = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  return (
    <main className="student-dashboard">

      {/* SIDEBAR */}
      <aside className="student-sidebar">
        <div className="student-sidebar-brand">
          <span className="student-brand-icon">✦</span>

          <div>
            <strong>NextGen</strong>
            <small>Student Portal</small>
          </div>
        </div>

        <p className="student-sidebar-label">
          MAIN MENU
        </p>

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

      {/* MAIN CONTENT */}
      <section className="student-main">

        {/* TOPBAR */}
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

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            <div className="student-welcome">
              <div>
                <span>YOUR LEARNING SPACE</span>

                <h1>
                  Welcome back, {student.name}! 👋
                </h1>

                <p>
                  Keep learning, stay organized and
                  make progress towards your goals.
                </p>
              </div>

              <Link to="/classes">
                Explore Classes →
              </Link>
            </div>

            {/* STATISTICS */}
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
                  {
                    new Set(
                      enrolledClasses.map(
                        (item) => item.subject
                      )
                    ).size
                  }
                </h3>
                <p>Subjects</p>
              </div>

            </div>

            {/* MY CLASSES */}
            <div className="student-panel">

              <div className="student-panel-heading">
                <h3>My Classes</h3>

                <button
                  type="button"
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

                {enrolledClasses.length === 0 && (
                  <p>No enrolled classes found.</p>
                )}
              </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="student-panel">
              <div className="student-panel-heading">
                <h3>Payment Overview</h3>

                <button
                  type="button"
                  onClick={() => setActiveTab("payments")}
                >
                  View Payments →
                </button>
              </div>

              <div className="student-payment-summary">
                <div className="student-payment-summary-card">
                  <span>Completed Payments</span>
                  <h3>{paidCount}</h3>
                </div>

                <div className="student-payment-summary-card">
                  <span>Pending Payments</span>
                  <h3>{pendingCount}</h3>
                </div>
              </div>
            </div>
          </>
        )}

        {/* MY CLASSES TAB */}
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
                    <p>
                      {item.day} • {item.time}
                    </p>
                  </div>

                  <Link to={`/classes/${item.id}`}>
                    View →
                  </Link>
                </div>
              ))}

              {enrolledClasses.length === 0 && (
                <p>No enrolled classes found.</p>
              )}
            </div>
          </div>
        )}

        {/* TIMETABLE TAB */}
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
                      <td>{item.hall || "Online"}</td>
                    </tr>
                  ))}

                  {enrolledClasses.length === 0 && (
                    <tr>
                      <td colSpan={4}>
                        No timetable available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <div className="student-panel">

            <div className="student-panel-heading">
              <h3>My Payments</h3>
              <span>Monthly Class Fees</span>
            </div>

            <div className="student-table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.subject}</td>
                      <td>{payment.month}</td>

                      <td>
                        Rs. {payment.amount.toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={
                            payment.status === "Paid"
                              ? "payment-status paid"
                              : "payment-status pending"
                          }
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="student-payment-note">
              Payment records shown here are demo data.
              Online payment verification will be
              connected later.
            </p>
          </div>
        )}

        {/* PROFILE TAB */}
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
                <strong>
                  Grade {student.grade}
                </strong>
              </div>

            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default StudentDashboard;
