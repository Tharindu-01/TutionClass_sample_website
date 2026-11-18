
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
  ShieldCheck,
  Sparkles,
  Clock3,
  Menu,
  X,
  ChevronRight,
  ImagePlus,
  AlertCircle,
} from "lucide-react";

import "./StudentDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const getToken = () =>
  sessionStorage.getItem("studentToken");

async function apiRequest(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
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

  const logout = () => {
    sessionStorage.removeItem("studentToken");
    navigate("/login", { replace: true });
  };

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
        const data = await apiRequest("/api/student/me", {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setStudent(data.student);

        if (data.student.hasPhoto) {
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

        if (err.status === 401 ||
            err.status === 403) {
          sessionStorage.removeItem("studentToken");
          navigate("/login", { replace: true });
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
      if (err.status === 401 || err.status === 403) {
        logout();
        return;
      }
      setNotice(err.message);
    } finally {
      setUploading(false);
    }
  };

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
      if (err.status === 401 || err.status === 403) {
        logout();
        return;
      }
      setNotice(err.message);
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return (
      <div className="sd-loading">
        <div className="sd-spinner" />
        <h2>Preparing your dashboard</h2>
        <p>Welcome to NextGen Education Academy</p>
      </div>
    );
  }

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

  const firstName = student.name.split(" ")[0];
  const initials = student.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Real profile completion based on available fields
  const profileFields = [
    Boolean(student.name),
    Boolean(student.email),
    Boolean(student.grade),
    Boolean(student.registrationNumber),
    Boolean(student.hasPhoto),
  ];

  const completedFields =
    profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const joinedDate = student.joinedAt
    ? new Date(student.joinedAt).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "Not available";

  const profilePhoto = photoUrl ? (
    <img src={photoUrl} alt={`${student.name} profile`} />
  ) : (
    <span>{initials}</span>
  );

  return (
    <div className="sd-layout">
      {/* MOBILE MENU */}
      <div className="sd-mobile-bar">
        <span>
          <GraduationCap size={23} />
          NextGen Portal
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle dashboard menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <button
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

          <div className="sd-nav-item sd-nav-active">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </div>

          <Link
            to="/classes"
            className="sd-nav-item"
          >
            <BookOpen size={19} />
            <span>Explore Classes</span>
          </Link>

          <Link
            to="/timetable"
            className="sd-nav-item"
          >
            <CalendarDays size={19} />
            <span>Timetable</span>
          </Link>

          <a
            href="#my-profile"
            className="sd-nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </a>
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
              onClick={logout}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="sd-main">
        <div className="sd-topbar">
          <div>
            <span className="sd-overline">
              STUDENT WORKSPACE
            </span>
            <h2>Dashboard Overview</h2>
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

        {/* WELCOME BANNER */}
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
              dashboard. Keep exploring,
              learning and growing with NextGen.
            </p>

            <Link
              to="/classes"
              className="sd-welcome-button"
            >
              Explore Classes
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div
            className="sd-welcome-art"
            aria-hidden="true"
          >
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
              ACCOUNT SNAPSHOT
            </span>
            <h2>My Statistics</h2>
          </div>
        </div>

        <section className="sd-stats">
          <div className="sd-stat-card">
            <div className="sd-stat-icon sd-icon-blue">
              <GraduationCap size={24} />
            </div>
            <span>Current Grade</span>
            <strong>{student.grade}</strong>
            <small>Academic level</small>
          </div>

          <div className="sd-stat-card">
            <div className="sd-stat-icon sd-icon-purple">
              <Hash size={24} />
            </div>
            <span>Registration ID</span>
            <strong className="sd-stat-reg">
              {student.registrationNumber}
            </strong>
            <small>Academy student ID</small>
          </div>

          <div className="sd-stat-card">
            <div className="sd-stat-icon sd-icon-green">
              <ShieldCheck size={24} />
            </div>
            <span>Account Status</span>
            <strong>Active</strong>
            <small>Registered student</small>
          </div>

          <div className="sd-stat-card">
            <div className="sd-stat-icon sd-icon-orange">
              <CheckCircle2 size={24} />
            </div>
            <span>Profile Complete</span>
            <strong>{profileCompletion}%</strong>
            <small>
              {completedFields} of 5 profile fields
            </small>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="sd-content-grid">
          {/* PROFILE CARD */}
          <section
            className="sd-card sd-profile-card"
            id="my-profile"
          >
            <div className="sd-card-header">
              <div>
                <h3>My Profile</h3>
                <p>
                  Manage your student identity
                </p>
              </div>
              <div className="sd-header-icon">
                <UserRound size={19} />
              </div>
            </div>

            <div className="sd-profile-top">
              <div className="sd-profile-avatar">
                {profilePhoto}

                <button
                  className="sd-camera-button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={uploading}
                  title="Change profile photo"
                  aria-label="Change profile photo"
                >
                  <Camera size={17} />
                </button>
              </div>

              <div className="sd-profile-identity">
                <h3>{student.name}</h3>
                <span>
                  <GraduationCap size={14} />
                  Grade {student.grade} Student
                </span>
                <small>
                  {student.registrationNumber}
                </small>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
              hidden
            />

            <div className="sd-photo-actions">
              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={uploading || removing}
                className="sd-upload-button"
              >
                {uploading ? (
                  <span className="sd-mini-spinner" />
                ) : (
                  <Upload size={16} />
                )}

                {uploading
                  ? "Uploading..."
                  : "Upload Photo"}
              </button>

              {student.hasPhoto && (
                <button
                  className="sd-remove-button"
                  onClick={handleRemovePhoto}
                  disabled={uploading || removing}
                >
                  <Trash2 size={16} />
                  {removing ? "Removing..." : "Remove"}
                </button>
              )}
            </div>

            <p className="sd-photo-hint">
              <ImagePlus size={14} />
              JPG, PNG or WEBP • Max 2 MB
            </p>

            {notice && (
              <p className="sd-notice" role="status">
                {notice}
              </p>
            )}

            <div className="sd-profile-details">
              <div className="sd-detail-row">
                <Mail size={18} />
                <div>
                  <span>Email Address</span>
                  <strong>{student.email}</strong>
                </div>
              </div>

              <div className="sd-detail-row">
                <Hash size={18} />
                <div>
                  <span>Registration Number</span>
                  <strong>
                    {student.registrationNumber}
                  </strong>
                </div>
              </div>

              <div className="sd-detail-row">
                <Clock3 size={18} />
                <div>
                  <span>Member Since</span>
                  <strong>{joinedDate}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* PROGRESS CARD */}
          <section className="sd-card sd-progress-card">
            <div className="sd-card-header">
              <div>
                <h3>Profile Progress</h3>
                <p>
                  Your account setup overview
                </p>
              </div>
              <div className="sd-header-icon">
                <CheckCircle2 size={19} />
              </div>
            </div>

            <div className="sd-progress-center">
              <div
                className="sd-progress-ring"
                style={{
                  "--progress": `${profileCompletion}%`,
                }}
                role="progressbar"
                aria-valuenow={profileCompletion}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Profile completion"
              >
                <div className="sd-progress-inner">
                  <strong>
                    {profileCompletion}%
                  </strong>
                  <span>Completed</span>
                </div>
              </div>
            </div>

            <div className="sd-progress-items">
              <div>
                <CheckCircle2 size={17} />
                Account created
                <span>Done</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                Student details added
                <span>Done</span>
              </div>

              <div>
                {student.hasPhoto ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Camera size={17} />
                )}
                Profile picture
                <span>
                  {student.hasPhoto
                    ? "Done"
                    : "Pending"}
                </span>
              </div>
            </div>

            {!student.hasPhoto && (
              <button
                className="sd-progress-action"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                Complete your profile
                <ChevronRight size={18} />
              </button>
            )}
          </section>
        </div>

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
          <Link to="/classes" className="sd-quick-card">
            <div className="sd-quick-icon sd-icon-blue">
              <BookOpen size={25} />
            </div>

            <div>
              <h3>Explore Classes</h3>
              <p>
                Discover subjects and teachers
              </p>
            </div>

            <ArrowUpRight
              className="sd-quick-arrow"
              size={19}
            />
          </Link>

          <Link
            to="/timetable"
            className="sd-quick-card"
          >
            <div className="sd-quick-icon sd-icon-purple">
              <CalendarDays size={25} />
            </div>

            <div>
              <h3>Class Timetable</h3>
              <p>
                Check class days and times
              </p>
            </div>

            <ArrowUpRight
              className="sd-quick-arrow"
              size={19}
            />
          </Link>
        </section>

        <footer className="sd-footer">
          <span>
            © {new Date().getFullYear()} NextGen Education Academy
          </span>
          <span>
            Learn • Grow • Succeed
          </span>
        </footer>
      </main>
    </div>
  );
}

export default StudentDashboard;
