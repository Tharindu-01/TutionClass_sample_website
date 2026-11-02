
import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage(
      "Login UI is ready. Authentication will be enabled after backend integration."
    );
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* Left Branding Panel */}
        <aside className="auth-brand">
          <div className="auth-brand-icon">✦</div>

          <span className="auth-eyebrow">
            NEXTGEN EDUCATION ACADEMY
          </span>

          <h1>
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p>
            Continue your learning journey.
            Access your classes, schedules and
            student dashboard in one place.
          </p>

          <div className="auth-benefits">
            <div>✓ Access your student dashboard</div>
            <div>✓ Explore your classes</div>
            <div>✓ View class timetables</div>
            <div>✓ Stay connected with teachers</div>
          </div>

          <div className="auth-brand-footer">
            LEARN TODAY. BUILD TOMORROW.
          </div>
        </aside>

        {/* Login Form */}
        <section className="auth-form-panel">
          <div className="auth-form-header">
            <span className="auth-tag">
              STUDENT PORTAL
            </span>

            <h2>Sign in to your account</h2>

            <p>
              New to NextGen?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="loginEmail">
                Email Address
              </label>

              <input
                id="loginEmail"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="loginPassword">
                Password
              </label>

              <div className="auth-password">
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <span>Secure student access</span>
              <span className="login-help">
                Contact the academy for account help
              </span>
            </div>

            {message && (
              <p
                className="auth-message"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              Sign In →
            </button>

            <p className="auth-note">
              Only registered NextGen Education Academy
              students can access the student portal.
            </p>
          </form>

          <div className="login-bottom">
            <p>Need assistance?</p>
            <Link to="/contact">
              Contact Our Support Team →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
