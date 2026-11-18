
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import "./Login.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please try again."
        );
      }

      if (!data.token) {
        throw new Error(
          "Authentication token was not received."
        );
      }

      sessionStorage.setItem(
        "studentToken",
        data.token
      );

      navigate("/student/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ng-login-page">
      <div className="ng-login-container">

        {/* ===== LEFT BRAND PANEL ===== */}
        <aside className="ng-login-brand">
          <div className="ng-login-brand-overlay" />

          <div className="ng-login-brand-content">
            <Link
              to="/"
              className="ng-login-brand-logo"
            >
              <img
                src="/nextgen-logo.png"
                alt="NextGen Education Academy"
              />

              <div>
                <strong>NextGen</strong>
                <span>EDUCATION ACADEMY</span>
              </div>
            </Link>

            <div className="ng-login-brand-main">
              <span className="ng-login-brand-badge">
                <GraduationCap size={16} />
                STUDENT PORTAL
              </span>

              <h1>
                Welcome
                <br />
                back<span>.</span>
              </h1>

              <p>
                Your learning journey continues here.
                Sign in to access your personal
                student dashboard and explore
                your learning resources.
              </p>

              <div className="ng-login-brand-feature">
                <BookOpen size={19} />
                <span>
                  Learn smarter. Achieve more.
                </span>
              </div>
            </div>

            <div className="ng-login-brand-bottom">
              NextGen Education Academy
              <span>Learn. Grow. Succeed.</span>
            </div>
          </div>
        </aside>

        {/* ===== RIGHT LOGIN PANEL ===== */}
        <section className="ng-login-form-panel">
          <div className="ng-login-form-wrapper">

            <span className="ng-login-eyebrow">
              STUDENT SIGN IN
            </span>

            <h2>Welcome Back!</h2>

            <p className="ng-login-subtitle">
              Enter your credentials to access
              your student account.
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="ng-login-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div className="ng-login-input-wrap">
                  <Mail size={19} />

                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="ng-login-field">
                <label htmlFor="login-password">
                  Password
                </label>

                <div className="ng-login-input-wrap">
                  <LockKeyhole size={19} />

                  <input
                    id="login-password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="ng-login-eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  className="ng-login-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="ng-login-submit"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}

                {!loading && (
                  <ArrowRight size={19} />
                )}
              </button>

              <div className="ng-login-register">
                Don't have an account?
                <Link to="/register">
                  Register Here
                </Link>
              </div>

            </form>

            <div className="ng-login-security">
              <ShieldCheck size={17} />
              <span>
                Secure access for registered
                NextGen students
              </span>
            </div>

            <Link
              to="/"
              className="ng-login-back-home"
            >
              Back to Homepage
              <ArrowRight size={15} />
            </Link>

          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
