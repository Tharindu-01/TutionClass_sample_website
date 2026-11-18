
import { Link } from "react-router";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Languages,
  UserRound,
  CalendarDays,
  Clock3,
  MonitorPlay,
} from "lucide-react";

import "./ClassCard.css";

const subjectIcons = {
  Mathematics: Calculator,
  Science: FlaskConical,
  English: BookOpen,
  Sinhala: Languages,
};

function ClassCard({ classData, classItem }) {
  const item = classData || classItem;

  if (!item) return null;

  const {
    id,
    subject,
    grade,
    teacher,
    day,
    time,
    mode,
  } = item;

  const SubjectIcon =
    subjectIcons[subject] || BookOpen;

  return (
    <article className="ng-class-card">
      <div className="ng-class-header">
        <div className="ng-class-header-top">
          <div className="ng-class-icon">
            <SubjectIcon size={29} />
          </div>

          <span className="ng-class-grade">
            Grade {grade}
          </span>
        </div>

        <h3>{subject}</h3>
        <p>Learn • Grow • Achieve</p>
      </div>

      <div className="ng-class-body">
        <div className="ng-class-details">
          <div className="ng-class-detail">
            <UserRound size={17} />
            <span>
              <strong>Teacher:</strong> {teacher}
            </span>
          </div>

          <div className="ng-class-detail">
            <CalendarDays size={17} />
            <span>
              <strong>Day:</strong> {day}
            </span>
          </div>

          <div className="ng-class-detail">
            <Clock3 size={17} />
            <span>
              <strong>Time:</strong> {time}
            </span>
          </div>

          <div className="ng-class-detail">
            <MonitorPlay size={17} />
            <span>
              <strong>Mode:</strong> {mode}
            </span>
          </div>
        </div>

        <Link
          to={`/classes/${id}`}
          className="ng-class-button"
        >
          <span>View Class Details</span>
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </article>
  );
}

export default ClassCard;
