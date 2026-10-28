
function WhyChooseUs() {
  const features = [
    {
      icon: "🎓",
      title: "Experienced Teachers",
      description:
        "Learn with dedicated teachers who support your education.",
    },
    {
      icon: "💻",
      title: "Flexible Learning",
      description:
        "Join physical and online classes based on your needs.",
    },
    {
      icon: "📅",
      title: "Organized Timetables",
      description:
        "Find your class schedules and important details easily.",
    },
    {
      icon: "📚",
      title: "O/L Exam Preparation",
      description:
        "Focused learning opportunities for Grade 10 and 11 students.",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-heading">
        <h2>Why Choose NextGen?</h2>
        <p>
          We provide a supportive learning environment
          to help students achieve their goals.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature.title}>
            <div className="why-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
