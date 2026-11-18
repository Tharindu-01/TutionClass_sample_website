
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { classes } from "../data/classes";
import ClassCard from "./ClassCard";
import "./FeaturedClasses.css";

function FeaturedClasses() {
  const featured = classes
    .filter((item) => Number(item.grade) === 10)
    .slice(0, 4);

  return (
    <section className="ng-featured-section">
      <div className="ng-featured-container">
        <div className="ng-featured-heading">
          <div>
            <span className="ng-featured-label">
              <Sparkles size={16} />
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

          <Link to="/classes" className="ng-featured-explore">
            Explore All Classes
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="ng-featured-grid">
          {featured.map((item) => (
            <ClassCard key={item.id} classData={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedClasses;
