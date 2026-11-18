
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  CalendarDays,
  UserRound,
  Mail,
  Hash,
  Camera,
  Upload,
  Trash2,
  LogOut,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Clock3,
  Menu,
  X,
  ChevronRight,
  ImagePlus,
  AlertCircle,
  MapPin,
  Monitor,
  Users,
  CalendarClock,
  ArrowRight,
  Pencil,
  Save,
  XCircle,
} from "lucide-react";

import "./StudentDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () =>
  sessionStorage.getItem("studentToken");

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const type = response.headers.get("content-type");

  const data = type?.includes("application/json")
    ? await response.json()
    : {};

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong"
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

function StudentDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [student, setStudent] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [myClasses, setMyClasses] = useState([]);
  const [myTimetable, setMyTimetable] = useState([]);

  const [academicLoading, setAcademicLoading] = useState(true);
  const [academicError, setAcademicError] = useState("");

  const [activeSection, setActiveSection] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("studentToken");
    setMenuOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  // LOAD STUDENT PROFILE
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const controller = new AbortController();
    let currentPhotoUrl = "";

    async function loadDashboard() {
      try {
        const data = await apiRequest(
          "/api/student/me",
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        setStudent(data.student);

        setProfileForm({
          name: data.student.name || "",
          email: data.student.email || "",
        });

        if (data.student?.hasPhoto) {
          const response = await fetch(
            `${API_URL}/api/student/me/photo`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }
          );

          if (response.ok) {
            const blob = await response.blob();

            if (!controller.signal.aborted) {
              currentPhotoUrl = URL.createObjectURL(blob);
              setPhotoUrl(currentPhotoUrl);
            }
          }
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.status === 401 || err.status === 403) {
          handleLogout();
          return;
        }

        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      controller.abort();

      if (currentPhotoUrl) {
        URL.revokeObjectURL(currentPhotoUrl);
      }
    };
  }, [navigate]);

  // LOAD CLASSES AND TIMETABLE
  useEffect(() => {
    const token = getToken();

    if (!token) return;

    const controller = new AbortController();

    async function loadAcademicData() {
      try {
        setAcademicLoading(true);
        setAcademicError("");

        const [classesData, timetableData] =
          await Promise.all([
            apiRequest("/api/student/my-classes", {
              signal: controller.signal,
            }),
            apiRequest("/api/student/my-timetable", {
              signal: controller.signal,
            }),
          ]);

        if (controller.signal.aborted) return;

        setMyClasses(classesData.classes || []);
        setMyTimetable(timetableData.timetable || []);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.status === 401 || err.status === 403) {
          handleLogout();
          return;
        }

        setAcademicError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setAcademicLoading(false);
        }
      }
    }

    loadAcademicData();

    return () => controller.abort();
  }, []);

  // OPEN MY PROFILE
  const openMyProfile = () => {
    setActiveSection("profile");
    setEditingProfile(false);
    setNotice("");

    setProfileForm({
      name: student?.name || "",
      email: student?.email || "",
    });

    setMenuOpen(false);
  };

  // OPEN OVERVIEW
  const openOverview = () => {
    setActiveSection("overview");
    setEditingProfile(false);
    setNotice("");
    setMenuOpen(false);
  };

  // PROFILE EDIT
  const handleProfileSave = async (event) => {
    event.preventDefault();

    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      setNotice("Please enter your name and email.");
      return;
    }

    setSavingProfile(true);
    setNotice("");

    try {
      const data = await apiRequest("/api/student/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileForm.name.trim(),
          email: profileForm.email.trim(),
        }),
      });

      setStudent(data.student);

      setProfileForm({
        name: data.student.name,
        email: data.student.email,
      });

      setEditingProfile(false);
      setNotice("Profile updated successfully!");
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        handleLogout();
        return;
      }

      setNotice(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  // CANCEL PROFILE EDIT
  const handleCancelEdit = () => {
    setEditingProfile(false);

    setProfileForm({
      name: student.name || "",
      email: student.email || "",
    });

    setNotice("");
  };

  // UPLOAD PROFILE PHOTO
  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setNotice("Please choose JPG, PNG or WEBP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setNotice("Image must be smaller than 2 MB.");
      return;
    }

    setUploading(true);
    setNotice("");

    try {
      const formData = new FormData();

      formData.append("photo", file);

      await apiRequest("/api/student/me/photo", {
        method: "POST",
        body: formData,
      });

      const response = await fetch(
        `${API_URL}/api/student/me/photo`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to refresh photo");
      }

      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      setPhotoUrl((oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
        return newUrl;
      });

      setStudent((previous) => ({
        ...previous,
        hasPhoto: true,
      }));

      setNotice("Profile photo updated successfully!");
    } catch (err) {
      setNotice(err.message);
    } finally {
      setUploading(false);
    }
  };

  // REMOVE PROFILE PHOTO
  const handleRemovePhoto = async () => {
    setRemoving(true);
    setNotice("");

    try {
      await apiRequest("/api/student/me/photo", {
        method: "DELETE",
      });

      setPhotoUrl((oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
        return "";
      });

      setStudent((previous) => ({
        ...previous,
        hasPhoto: false,
      }));

      setNotice("Profile photo removed.");
    } catch (err) {
      setNotice(err.message);
    } finally {
      setRemoving(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="sd-loading">
        <div className="sd-spinner" />
        <h2>Preparing your dashboard</h2>
        <p>Welcome to NextGen Education Academy</p>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="sd-loading">
        <AlertCircle size={40} />
        <h2>Unable to load dashboard</h2>
        <p>{error}</p>

        <button
          className="sd-primary-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!student) return null;

  const firstName = student.name?.split(" ")[0] || "Student";

  const initials = (student.name || "Student")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const profileFields = [
    Boolean(student.name),
    Boolean(student.email),
    Boolean(student.grade),
    Boolean(student.registrationNumber),
    Boolean(student.hasPhoto),
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const joinedDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const profilePhoto = photoUrl ? (
    <img src={photoUrl} alt={`${student.name} profile`} />
  ) : (
    <span>{initials}</span>
  );

  return (
    <div className="sd-layout">

      {/* MOBILE NAVBAR */}
      <div className="sd-mobile-bar">
        <span>
          <GraduationCap size={23} />
          NextGen Portal
        </span>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle dashboard menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="sd-mobile-overlay"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`sd-sidebar ${
          menuOpen ? "sd-sidebar-open" : ""
        }`}
      >
        <Link
          to="/"
          className="sd-brand"
          onClick={() => setMenuOpen(false)}
        >
          <div className="sd-brand-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <strong>NextGen</strong>
            <span>STUDENT PORTAL</span>
          </div>
        </Link>

        <div className="sd-sidebar-section">
          <span className="sd-sidebar-label">
            MAIN MENU
          </span>

          <button
            type="button"
            className={`sd-nav-item ${
              activeSection === "overview" ? "sd-nav-active" : ""
            }`}
            onClick={openOverview}
          >
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className="sd-nav-item"
            onClick={() => {
              openOverview();
              setTimeout(() => {
                document.getElementById("my-classes")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 0);
            }}
          >
            <BookOpen size={19} />
            <span>My Classes</span>
          </button>

          <button
            type="button"
            className="sd-nav-item"
            onClick={() => {
              openOverview();
              setTimeout(() => {
                document.getElementById("my-timetable")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 0);
            }}
          >
            <CalendarDays size={19} />
            <span>My Timetable</span>
          </button>

          <button
            type="button"
            className={`sd-nav-item ${
              activeSection === "profile" ? "sd-nav-active" : ""
            }`}
            onClick={openMyProfile}
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </button>

          <Link
            to="/classes"
            className="sd-nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <GraduationCap size={19} />
            <span>Explore Classes</span>
          </Link>
        </div>

        <div className="sd-sidebar-bottom">
          <div className="sd-sidebar-help">
            <Sparkles size={22} />
            <strong>Keep Learning!</strong>
            <p>
              Every lesson brings you closer
              to your goals.
            </p>
          </div>

          <div className="sd-sidebar-user">
            <div className="sd-small-avatar">
              {profilePhoto}
            </div>

            <div className="sd-sidebar-user-info">
              <strong>{student.name}</strong>
              <span>Grade {student.grade}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="sd-main">

        {/* TOP BAR */}
        <div className="sd-topbar">
          <div>
            <span className="sd-overline">
              STUDENT WORKSPACE
            </span>

            <h2>
              {activeSection === "overview"
                ? "Dashboard Overview"
                : "My Profile"}
            </h2>
          </div>

          <div className="sd-topbar-right">
            <span className="sd-status-pill">
              <span className="sd-status-dot" />
              Student Account
            </span>

            <div className="sd-top-avatar">
              {profilePhoto}
            </div>
          </div>
        </div>

        {/* OVERVIEW PAGE */}
        {activeSection === "overview" && (
          <>

            {/* WELCOME */}
            <section className="sd-welcome">
              <div className="sd-welcome-content">
                <span className="sd-welcome-badge">
                  <Sparkles size={15} />
                  YOUR LEARNING SPACE
                </span>

                <h1>
                  Hello, {firstName}
                  <span className="sd-wave"> 👋</span>
                </h1>

                <p>
                  Welcome to your personal learning
                  dashboard. Manage your classes,
                  timetable and academic journey
                  with NextGen.
                </p>

                <button
                  type="button"
                  className="sd-welcome-button"
                  onClick={() => {
                    document.getElementById("my-classes")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  View My Classes
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="sd-welcome-art" aria-hidden="true">
                <div className="sd-art-circle sd-art-one" />
                <div className="sd-art-circle sd-art-two" />

                <div className="sd-art-main">
                  <GraduationCap size={76} />
                </div>

                <div className="sd-art-float sd-art-book">
                  <BookOpen size={26} />
                </div>

                <div className="sd-art-float sd-art-star">
                  <Sparkles size={25} />
                </div>
              </div>
            </section>

            {/* STATISTICS */}
            <div className="sd-section-heading">
              <div>
                <span className="sd-overline">
                  ACADEMIC SNAPSHOT
                </span>
                <h2>My Statistics</h2>
              </div>
            </div>

            <section className="sd-stats">
              <div className="sd-stat-card">
                <div className="sd-stat-icon sd-icon-blue">
                  <BookOpen size={24} />
                </div>

                <span>Enrolled Classes</span>
                <strong>
                  {academicLoading ? "..." : myClasses.length}
                </strong>
                <small>Active classes</small>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-icon sd-icon-purple">
                  <CalendarDays size={24} />
                </div>

                <span>Weekly Sessions</span>
                <strong>
                  {academicLoading ? "..." : myTimetable.length}
                </strong>
                <small>Scheduled lessons</small>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-icon sd-icon-green">
                  <GraduationCap size={24} />
                </div>

                <span>Current Grade</span>
                <strong>{student.grade}</strong>
                <small>Academic level</small>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-icon sd-icon-orange">
                  <CheckCircle2 size={24} />
                </div>

                <span>Profile Complete</span>
                <strong>{profileCompletion}%</strong>
                <small>{completedFields} of 5 fields</small>
              </div>
            </section>

            {/* MY CLASSES */}
            <section
              className="sd-academic-section"
              id="my-classes"
            >
              <div className="sd-section-heading">
                <div>
                  <span className="sd-overline">
                    MY LEARNING
                  </span>
                  <h2>My Enrolled Classes</h2>
                </div>

                <span className="sd-class-count">
                  {myClasses.length} Classes
                </span>
              </div>

              {academicLoading ? (
                <div className="sd-academic-empty">
                  Loading your classes...
                </div>
              ) : academicError ? (
                <div className="sd-academic-empty">
                  <AlertCircle size={30} />
                  {academicError}
                </div>
              ) : myClasses.length === 0 ? (
                <div className="sd-academic-empty">
                  <BookOpen size={35} />
                  <h3>No enrolled classes yet</h3>
                  <p>
                    Your classes will appear here
                    once the academy assigns them.
                  </p>
                </div>
              ) : (
                <div className="sd-enrolled-grid">
                  {myClasses.map((classItem) => (
                    <div
                      className="sd-enrolled-card"
                      key={classItem._id}
                    >
                      <div className="sd-enrolled-top">
                        <div className="sd-enrolled-icon">
                          <BookOpen size={25} />
                        </div>

                        <span className="sd-grade-tag">
                          Grade {classItem.grade}
                        </span>
                      </div>

                      <h3>{classItem.subject}</h3>

                      <p className="sd-enrolled-teacher">
                        <Users size={15} />
                        {classItem.teacherName}
                      </p>

                      <div className="sd-enrolled-details">
                        <span>
                          <MapPin size={15} />
                          {classItem.mode === "Online"
                            ? "Online Class"
                            : classItem.hallNumber || "Hall not assigned"}
                        </span>

                        <span>
                          <CalendarClock size={15} />
                          {classItem.schedule?.[0]
                            ? `${classItem.schedule[0].day} • ${classItem.schedule[0].startTime}`
                            : "Schedule pending"}
                        </span>
                      </div>

                      <div className="sd-enrolled-bottom">
                        <span>{classItem.classCode}</span>

                        <a
                          href="#my-timetable"
                          onClick={() => {
                            document.getElementById("my-timetable")?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          View Timetable
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* MY TIMETABLE */}
            <section
              className="sd-academic-section"
              id="my-timetable"
            >
              <div className="sd-section-heading">
                <div>
                  <span className="sd-overline">
                    WEEKLY SCHEDULE
                  </span>
                  <h2>My Class Timetable</h2>
                </div>
              </div>

              {academicLoading ? (
                <div className="sd-academic-empty">
                  Loading timetable...
                </div>
              ) : academicError ? (
                <div className="sd-academic-empty">
                  {academicError}
                </div>
              ) : myTimetable.length === 0 ? (
                <div className="sd-academic-empty">
                  <CalendarDays size={35} />
                  <h3>No timetable available</h3>
                  <p>
                    Your class timetable will appear here.
                  </p>
                </div>
              ) : (
                <div className="sd-timetable-list">
                  {myTimetable.map((item, index) => (
                    <div
                      className="sd-timetable-item"
                      key={`${item.classId}-${item.day}-${item.startTime}-${index}`}
                    >
                      <div className="sd-timetable-day">
                        <CalendarDays size={19} />
                        <strong>{item.day}</strong>
                      </div>

                      <div className="sd-timetable-info">
                        <h3>{item.subject}</h3>
                        <p>{item.teacherName}</p>
                      </div>

                      <div className="sd-timetable-time">
                        <CalendarClock size={16} />
                        {item.startTime} - {item.endTime}
                      </div>

                      <span className="sd-timetable-mode">
                        {item.mode === "Online" ? (
                          <Monitor size={15} />
                        ) : (
                          <MapPin size={15} />
                        )}

                        {item.mode === "Online"
                          ? "Online"
                          : item.hallNumber || "Physical"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* QUICK ACCESS */}
            <div className="sd-section-heading sd-quick-heading">
              <div>
                <span className="sd-overline">
                  LEARNING RESOURCES
                </span>
                <h2>Quick Access</h2>
              </div>
            </div>

            <section className="sd-quick-grid">
              <button
                type="button"
                className="sd-quick-card"
                onClick={() => {
                  document.getElementById("my-classes")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <div className="sd-quick-icon sd-icon-blue">
                  <BookOpen size={25} />
                </div>

                <div>
                  <h3>My Classes</h3>
                  <p>View your enrolled subjects</p>
                </div>

                <ArrowUpRight
                  className="sd-quick-arrow"
                  size={19}
                />
              </button>

              <button
                type="button"
                className="sd-quick-card"
                onClick={() => {
                  document.getElementById("my-timetable")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <div className="sd-quick-icon sd-icon-purple">
                  <CalendarDays size={25} />
                </div>

                <div>
                  <h3>My Timetable</h3>
                  <p>View your weekly schedule</p>
                </div>

                <ArrowUpRight
                  className="sd-quick-arrow"
                  size={19}
                />
              </button>
            </section>

            <footer className="sd-footer">
              <span>
                © {new Date().getFullYear()} NextGen Education Academy
              </span>
              <span>Learn • Grow • Succeed</span>
            </footer>
          </>
        )}

        {/* MY PROFILE PAGE */}
        {activeSection === "profile" && (
          <section className="sd-profile-page">

            <div className="sd-profile-page-heading">
              <div>
                <span className="sd-overline">
                  STUDENT ACCOUNT
                </span>
                <h1>My Profile</h1>
                <p>
                  View and manage your personal information.
                </p>
              </div>

              {!editingProfile && (
                <button
                  type="button"
                  className="sd-edit-profile-button"
                  onClick={() => {
                    setProfileForm({
                      name: student.name || "",
                      email: student.email || "",
                    });

                    setEditingProfile(true);
                    setNotice("");
                  }}
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="sd-profile-page-card">

              {/* PROFILE HEADER */}
              <div className="sd-profile-page-top">
                <div className="sd-profile-avatar">
                  {profilePhoto}

                  <button
                    type="button"
                    className="sd-camera-button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || removing}
                    aria-label="Change profile photo"
                  >
                    <Camera size={17} />
                  </button>
                </div>

                <div>
                  <h2>{student.name}</h2>

                  <span className="sd-profile-grade">
                    <GraduationCap size={15} />
                    Grade {student.grade} Student
                  </span>

                  <p>{student.registrationNumber}</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                hidden
              />

              {/* PHOTO ACTIONS */}
              <div className="sd-photo-actions">
                <button
                  type="button"
                  className="sd-upload-button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || removing}
                >
                  <Upload size={16} />
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>

                {student.hasPhoto && (
                  <button
                    type="button"
                    className="sd-remove-button"
                    onClick={handleRemovePhoto}
                    disabled={uploading || removing}
                  >
                    <Trash2 size={16} />
                    {removing ? "Removing..." : "Remove Photo"}
                  </button>
                )}
              </div>

              <p className="sd-photo-hint">
                <ImagePlus size={14} />
                JPG, PNG or WEBP • Maximum 2 MB
              </p>

              {notice && (
                <p className="sd-notice">
                  {notice}
                </p>
              )}

              <div className="sd-profile-divider" />

              {/* EDIT PROFILE FORM */}
              {editingProfile ? (
                <form
                  className="sd-profile-form"
                  onSubmit={handleProfileSave}
                >
                  <div className="sd-profile-field">
                    <label htmlFor="profileName">
                      Full Name
                    </label>

                    <input
                      id="profileName"
                      type="text"
                      value={profileForm.name}
                      onChange={(event) =>
                        setProfileForm((previous) => ({
                          ...previous,
                          name: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="sd-profile-field">
                    <label htmlFor="profileEmail">
                      Email Address
                    </label>

                    <input
                      id="profileEmail"
                      type="email"
                      value={profileForm.email}
                      onChange={(event) =>
                        setProfileForm((previous) => ({
                          ...previous,
                          email: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="sd-profile-field">
                    <label>Registration Number</label>

                    <input
                      type="text"
                      value={student.registrationNumber}
                      disabled
                    />

                    <small>
                      Issued by the academy. Cannot be changed.
                    </small>
                  </div>

                  <div className="sd-profile-field">
                    <label>Grade</label>

                    <input
                      type="text"
                      value={`Grade ${student.grade}`}
                      disabled
                    />

                    <small>
                      Contact the academy to change your grade.
                    </small>
                  </div>

                  <div className="sd-profile-form-actions">
                    <button
                      type="button"
                      className="sd-cancel-button"
                      onClick={handleCancelEdit}
                      disabled={savingProfile}
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="sd-save-profile-button"
                      disabled={savingProfile}
                    >
                      <Save size={16} />
                      {savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (

                /* PROFILE INFORMATION */
                <div className="sd-profile-information">
                  <div className="sd-profile-info-item">
                    <UserRound size={19} />

                    <div>
                      <span>Full Name</span>
                      <strong>{student.name}</strong>
                    </div>
                  </div>

                  <div className="sd-profile-info-item">
                    <Mail size={19} />

                    <div>
                      <span>Email Address</span>
                      <strong>{student.email}</strong>
                    </div>
                  </div>

                  <div className="sd-profile-info-item">
                    <Hash size={19} />

                    <div>
                      <span>Registration Number</span>
                      <strong>{student.registrationNumber}</strong>
                    </div>
                  </div>

                  <div className="sd-profile-info-item">
                    <GraduationCap size={19} />

                    <div>
                      <span>Current Grade</span>
                      <strong>Grade {student.grade}</strong>
                    </div>
                  </div>

                  <div className="sd-profile-info-item">
                    <Clock3 size={19} />

                    <div>
                      <span>Member Since</span>
                      <strong>{joinedDate}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="sd-footer">
              <span>
                © {new Date().getFullYear()} NextGen Education Academy
              </span>
              <span>Learn • Grow • Succeed</span>
            </footer>
          </section>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
