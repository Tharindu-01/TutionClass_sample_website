
import { useState } from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const academyEmail = "YOUR_ACADEMY_EMAIL@example.com";

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (academyEmail.includes("YOUR_ACADEMY_EMAIL")) {
      setStatus(
        "Please configure the academy email address first."
      );
      return;
    }

    const subject = encodeURIComponent(
      `NextGen Inquiry: ${form.subject}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Subject: ${form.subject}\n\n` +
      `Message:\n${form.message}`
    );

    window.location.href =
      `mailto:${academyEmail}?subject=${subject}&body=${body}`;

    setStatus(
      "Your email application should open. Please send the prepared message."
    );
  }

  return (
    <main className="ng-contact-page">

      {/* ===== HERO SECTION ===== */}
      <section className="ng-contact-hero">
        <div className="ng-contact-hero-inner">

          <span className="ng-contact-eyebrow">
            <Sparkles size={15} />
            CONNECT WITH NEXTGEN
          </span>

          <h1>
            Let's Get in <span>Touch.</span>
          </h1>

          <p>
            Have questions about our classes, schedules,
            teachers, or student registration?
            We're always happy to help.
          </p>

          <div className="ng-contact-hero-note">
            <MessageCircle size={17} />
            <span>
              Your learning journey matters to us
            </span>
          </div>

        </div>
      </section>

      <div className="ng-contact-container">

        {/* ===== INFORMATION CARDS ===== */}
        <div className="ng-contact-info-grid">

          <div className="ng-contact-info-card">
            <div className="ng-contact-info-icon">
              <Mail size={22} />
            </div>

            <h3>Email Us</h3>

            <p>
              Have a question? Send us a message
              using the contact form below.
            </p>

            <span>General Inquiries</span>
          </div>

          <div className="ng-contact-info-card">
            <div className="ng-contact-info-icon">
              <Phone size={22} />
            </div>

            <h3>Call Us</h3>

            <p>
              Contact our academy team for
              information about classes.
            </p>

            <Link to="/classes">
              View Class Details
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="ng-contact-info-card">
            <div className="ng-contact-info-icon">
              <MapPin size={22} />
            </div>

            <h3>Our Location</h3>

            <p>
              Learn more about our physical
              classes and learning environment.
            </p>

            <span>Sri Lanka</span>
          </div>

          <div className="ng-contact-info-card">
            <div className="ng-contact-info-icon">
              <Clock3 size={22} />
            </div>

            <h3>Class Information</h3>

            <p>
              Explore class schedules,
              available subjects, and times.
            </p>

            <Link to="/timetable">
              View Timetable
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>

        {/* ===== MAIN CONTACT AREA ===== */}
        <div className="ng-contact-main">

          {/* LEFT CONTENT */}
          <div className="ng-contact-side">

            <span className="ng-contact-section-label">
              LET'S CONNECT
            </span>

            <h2>
              We're always happy
              to hear from you.
            </h2>

            <p>
              Whether you're a student, parent,
              or someone interested in joining
              NextGen Education Academy, feel
              free to reach out.
            </p>

            <div className="ng-contact-side-feature">
              <div>
                <MessageCircle size={20} />
              </div>

              <span>
                <strong>
                  Questions about classes?
                </strong>
                Our team can help you find
                the right learning option.
              </span>
            </div>

            <div className="ng-contact-side-feature">
              <div>
                <CheckCircle2 size={20} />
              </div>

              <span>
                <strong>
                  Need registration information?
                </strong>
                Contact us to learn about
                student registration.
              </span>
            </div>

            <Link
              to="/classes"
              className="ng-contact-explore-link"
            >
              Explore Our Classes
              <ArrowUpRight size={17} />
            </Link>

          </div>

          {/* RIGHT CONTACT FORM */}
          <div className="ng-contact-form-card">

            <div className="ng-contact-form-heading">
              <h2>Send Us a Message</h2>

              <p>
                Fill in the details below and
                get in touch with our academy.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="ng-contact-form-row">

                <div className="ng-contact-field">
                  <label htmlFor="contact-name">
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ng-contact-field">
                  <label htmlFor="contact-email">
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="ng-contact-field">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a subject
                  </option>

                  <option value="Class Information">
                    Class Information
                  </option>

                  <option value="Student Registration">
                    Student Registration
                  </option>

                  <option value="Timetable Inquiry">
                    Timetable Inquiry
                  </option>

                  <option value="Other Inquiry">
                    Other Inquiry
                  </option>
                </select>
              </div>

              <div className="ng-contact-field">
                <label htmlFor="contact-message">
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="ng-contact-submit"
              >
                Prepare Email
                <Send size={18} />
              </button>

              {status && (
                <p
                  className="ng-contact-status"
                  role="status"
                >
                  {status}
                </p>
              )}

              <p className="ng-contact-form-note">
                This form prepares an email
                in your email application.
                It does not send automatically.
              </p>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Contact;
