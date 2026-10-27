
import { Link } from "react-router";

function Hero() {
  return (
    <section className="nextgen-hero">
      <div className="nextgen-hero-content">

        <span className="hero-label">
          GRADE 10 & 11 EDUCATION
        </span>

        <h1>
          Build Your Future with
          <span> NextGen Education Academy</span>
        </h1>

        <p>
          Quality education, experienced teachers,
          and flexible learning opportunities
          for O/L students.
        </p>

        <div className="hero-actions">
          <Link to="/classes" className="hero-primary">
            Explore Classes
          </Link>

          <Link to="/timetable" className="hero-secondary">
            View Timetable
          </Link>
        </div>

        <div className="hero-highlights">
          <div>
            <strong>10 & 11</strong>
            <span>Grades</span>
          </div>

          <div>
            <strong>Online</strong>
            <span>Learning</span>
          </div>

          <div>
            <strong>Physical</strong>
            <span>Classes</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
