
import React from "react";
import { Link, useLocation } from "react-router";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="ng-footer">
      <div className="ng-footer-container">

        {/* ===== TOP FOOTER ===== */}
        <div className="ng-footer-grid">

          {/* BRAND SECTION */}
          <div className="ng-footer-brand-section">

            <Link
              to="/"
              className="ng-footer-brand"
              onClick={scrollToTop}
            >
              <img
                src="/nextgen-logo.png"
                alt="NextGen Education Academy Logo"
                className="ng-footer-logo"
              />

              <div className="ng-footer-brand-text">
                <h3>NextGen</h3>
                <span>EDUCATION ACADEMY</span>
              </div>
            </Link>

            <p className="ng-footer-description">
              Empowering Grade 10 and Grade 11
              students through quality education,
              experienced teachers, and a better
              learning environment.
            </p>

            <div className="ng-footer-brand-tag">
              Learn. Grow. Succeed.
            </div>

          </div>

          {/* QUICK LINKS */}
          <div className="ng-footer-column">
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>
            <Link to="/classes">Our Classes</Link>
            <Link to="/timetable">Timetable</Link>
            <Link to="/teachers">Our Teachers</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          {/* STUDENT LINKS */}
          <div className="ng-footer-column">
            <h4>Students</h4>

            <Link to="/login">Student Login</Link>
            <Link to="/register">Registration</Link>
            <Link to="/classes">Explore Classes</Link>
            <Link to="/timetable">Class Schedule</Link>
          </div>

          {/* CONTACT */}
          <div className="ng-footer-column ng-footer-contact">
            <h4>Get in Touch</h4>

            <div className="ng-footer-contact-item">
              <MapPin size={17} />
              <span>Sri Lanka</span>
            </div>

            <div className="ng-footer-contact-item">
              <Mail size={17} />
              <Link to="/contact">
                Send an Inquiry
              </Link>
            </div>

            <div className="ng-footer-contact-item">
              <Phone size={17} />
              <Link to="/contact">
                Contact Our Academy
              </Link>
            </div>

            <Link
              to="/contact"
              className="ng-footer-contact-button"
            >
              Contact Us
              <ArrowUpRight size={16} />
            </Link>
          </div>

        </div>

        {/* ===== BOTTOM FOOTER ===== */}
        <div className="ng-footer-bottom">

          <p>
            © {new Date().getFullYear()} NextGen
            Education Academy. All rights reserved.
          </p>

          <p className="ng-footer-bottom-right">
            Made with
            <Heart size={13} fill="currentColor" />
            for better education
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
