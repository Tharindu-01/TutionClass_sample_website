
import { Link } from 'react-router'

function Hero() {
  return (
    <section className="hero">
      <span className="tag">Grade 10 & 11 Education</span>

      <h1>Learn Better. Achieve More.</h1>

      <p>
        Quality education for O/L students through
        physical and online classes.
      </p>

      <Link to="/classes" className="primary-button">
        Explore Classes
      </Link>
    </section>
  )
}

export default Hero
