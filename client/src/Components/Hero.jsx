
import { useEffect, useState } from "react";
import { Link } from "react-router";

import hero1 from "../assets/hero/hero1.png";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";

const slides = [
  { image: hero1, alt: "Students attending a tuition class" },
  { image: hero2, alt: "Teacher conducting a class" },
  { image: hero3, alt: "Students studying in a lecture hall" },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        (previous + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function nextSlide() {
    setCurrentSlide((previous) =>
      (previous + 1) % slides.length
    );
  }

  function previousSlide() {
    setCurrentSlide((previous) =>
      (previous - 1 + slides.length) % slides.length
    );
  }

  return (
    <section className="slider-hero">
      <div className="slider-images">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className={
              index === currentSlide
                ? "slider-image active"
                : "slider-image"
            }
          />
        ))}
      </div>

      <div className="slider-overlay" />

      <div className="slider-content">
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
      </div>

      <button
        type="button"
        className="slider-arrow slider-prev"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="slider-arrow slider-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={
              index === currentSlide
                ? "slider-dot active"
                : "slider-dot"
            }
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
