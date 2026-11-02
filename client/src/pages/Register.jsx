
import { useState } from "react";
import { Link } from "react-router";

function Register() {
  const [form, setForm] = useState({
    registrationNumber: "",
    fullName: "",
    email: "",
    grade: "10",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setMessage(
      "Form validation passed. Account creation will be enabled after backend integration."
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
            Your future
            <br />
            starts <span>here.</span>
          </h1>

          <p>
            Join a learning community designed to
            support your O/L education journey.
          </p>

          <div className="auth-benefits">
            <div>✓ Verified student access</div>
            <div>✓ Grade 10 & 11 learning</div>
            <div>✓ Organized class information</div>
            <div>✓ Your personal student dashboard</div>
          </div>

          <div className="auth-brand-footer">
            LEARN TODAY. BUILD TOMORROW.
          </div>
        </aside>

        {/* Registration Form */}
        <section className="auth-form-panel">
          <div className="auth-form-header">
            <span className="auth-tag">
              STUDENT REGISTRATION
            </span>

            <h2>Create your account</h2>

            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="registrationNumber">
                Student Registration Number
              </label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="Enter your issued registration number"
                value={form.registrationNumber}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <small>
                Use the number provided by the academy.
              </small>
            </div>

            <div className="auth-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="grade">Your Grade</label>
              <select
                id="grade"
                name="grade"
                value={form.grade}
                onChange={handleChange}
              >
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
              </select>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>

              <div className="auth-password">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
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
              Create Account →
            </button>

            <p className="auth-note">
              Registration is available only for
              students with academy-issued numbers.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Register;
