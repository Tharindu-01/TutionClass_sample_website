
import Hero from "../Components/Hero";
import WhyChooseUs from "../Components/WhyChooseUs";
import TeachersSection from "../Components/TeachersSection";
import FeaturedClasses from "../Components/FeaturedClasses";

function Home() {
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

      {/* Premium Featured Classes */}
      <FeaturedClasses />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Our Teachers */}
      <TeachersSection />
    </div>
  );
}

export default Home;
