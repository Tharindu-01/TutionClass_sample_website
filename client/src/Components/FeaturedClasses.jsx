
import { Link } from "react-router";

import {
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Languages,
  Sparkles,
} from "lucide-react";

import { classes } from "../data/classes";

// Subject icons
const subjectIcons = {
  Mathematics: Calculator,
  Science: FlaskConical,
  English: BookOpen,
  Sinhala: Languages,
};

// Subject background images
const subjectImages = {
  Mathematics: "/images/mathematics.jpg",
  Science: "/images/science.jpg",
  English: "/images/english.jpg",
  Sinhala: "/images/sinhala.jpg",
};

function FeaturedClasses() {
  // Display four Grade 10 classes
  const featured = classes
    .filter((item) => Number(item.grade) === 10)
    .slice(0, 4);

  return (
    <section className="featured-premium">
      <div className="featured-container">

        {/* Section Header */}
        <div className="featured-header">
          <div>
            <span className="featured-eyebrow">
              <Sparkles size={15} />
              LEARN WITH NEXTGEN
            </span>

            <h2>
              Featured <span>Classes</span>
            </h2>

            <p>
              Explore our classes and find the right
              learning opportunity for you.
            </p>
          </div>

          <Link
            to="/classes"
            className="featured-all-link"
          >
            Explore All Classes
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Featured Classes Grid */}
        <div className="featured-grid">
          {featured.map((item, index) => {
            const SubjectIcon =
              subjectIcons[item.subject] || BookOpen;

            const subjectImage =
              subjectImages[item.subject] ||
              "/images/mathematics.jpg";

            return (
              <article
                key={item.id}
                className="featured-card"
                style={{
                  "--card-index": index,
                }}
              >

                {/* Subject Image */}
                <div className="featured-image">
                  <img
                    src={subjectImage}
                    alt={`${item.subject} class`}
                    loading="lazy"
                  />
                </div>

                {/* Icon and Grade */}
                <div className="featured-card-top">
                  <div className="featured-subject-icon">
                    <SubjectIcon size={25} />
                  </div>

                  <span className="featured-grade">
                    Grade {item.grade}
                  </span>
                </div>

                {/* Subject Name */}
                <h3>{item.subject}</h3>

                {/* Class Information */}
                <div className="featured-info">
                  <p>
                    <strong>Teacher:</strong>{" "}
                    {item.teacher}
                  </p>

                  <p>
                    <strong>Day:</strong>{" "}
                    {item.day}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {item.time}
                  </p>

                  <p>
                    <strong>Mode:</strong>{" "}
                    {item.mode}
                  </p>
                </div>

                {/* Animated Blue Gradient Button */}
                <Link
                  to={`/classes/${item.id}`}
                  className="featured-details-btn"
                >
                  <span>View Class Details</span>
                  <ArrowRight size={18} />
                </Link>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedClasses;
