
import Hero from "../Components/Hero";
import { Link } from "react-router";
import { classes } from "../data/classes";
import WhyChooseUs from "../Components/WhyChooseUs";
import TeachersSection from "../Components/TeachersSection";

function Home() {
  const featuredClasses = classes.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Welcome Section */}
      <section className="about">
        <h2>Welcome to NextGen Education Academy</h2>
        <p>
          Quality education for Grade 10 and Grade 11
          students through physical and online classes.
        </p>
      </section>

      {/* Featured Classes Section */}
      <section className="featured-section">
        <div className="featured-heading">
          <div>
            <h2>Featured Classes</h2>
            <p>
              Explore our classes and find the right
              learning opportunity for you.
            </p>
          </div>

          <Link to="/classes" className="featured-view-all">
            View All Classes →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredClasses.map((item) => (
            <div className="featured-card" key={item.id}>
              <span className="featured-grade">
                Grade {item.grade}
              </span>

              <h3>{item.subject}</h3>

              <div className="featured-info">
                <p>
                  <strong>Teacher:</strong> {item.teacher}
                </p>
                <p>
                  <strong>Day:</strong> {item.day}
                </p>
                <p>
                  <strong>Time:</strong> {item.time}
                </p>
                <p>
                  <strong>Mode:</strong> {item.mode}
                </p>
              </div>

              <Link
                to={`/classes/${item.id}`}
                className="featured-button"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Our Teachers Section */}
      <TeachersSection />
    </div>
  );
}

export default Home;
