import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import courses from "../../../../data/courses";
import teachers from "../../../../data/teachers";
import enrollments from "../../../../data/enrollment";
import { lessons } from "../../../../data/courses";
import assessments from "../../../../data/userAssessment";

export default function ColMain() {
  return (
    <div className="col-main">
      {/* Greeting card */}
      <GreetingCard />

      {/* Performance + My visit row */}
      <div className="stats-row">
        {/* Performance card */}
        <PerformanceCard />

        {/* My visit card */}
        <VisitCard />
      </div>

      {/* Linked Teachers */}
      <TeacherCard />
    </div>
  );
}

function GreetingCard() {
  const { user } = useContext(AuthContext);
  return (
    <section className="greeting-card">
      <div className="greeting-text">
        <h1>Hello {user.name.split(" ")[0]}!</h1>
        <p>
          You have X new tasks. It is a lot of work for today! So let's start!
        </p>
        <button className="review-btn">review it</button>
      </div>
      <div className="greeting-illustration">
        <div className="illustration-placeholder">🧑‍💻</div>
      </div>
    </section>
  );
}

function PerformanceCard() {
  const { user } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAsessments = assessments.filter((a) => a.userId === user.id);

  console.log("Enrollements:", myEnrollments);
  console.log("programid:", myProgramIds);
  console.log("Lesson:", myLessons);
  console.log("assessment:", myAsessments);

  // const currentUserPerformance = courses.filter(
  //   (cur) => cur.userId === user.id
  // );

  return (
    <section className="card performance-card">
      <div className="card-header">
        <h2>Performance</h2>
        <div className="dropdown">
          <MonthSelection />
        </div>
      </div>

      <div className="best-lessons-header">
        <span>The best lessons</span>
        <button className="pill-btn">All lessons</button>
      </div>

      <div className="score-row">
        <span className="score">95.4</span>
        <span className="score-label">Introduction to programming</span>
      </div>

      <div className="bar-chart">
        {myLessons.map((lesson) => {
          const assessment = myAsessments.find((a) => a.lessonId === lesson.id);
          return (
            <div className="bar-item">
              <span className="bar-value">{assessment?.score ?? 0}%</span>
              <div
                className="bar"
                style={{ height: `${assessment?.score}%` }}
              />
              <span className="bar-label">{lesson.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function VisitCard() {
  return (
    <section className="card visit-card">
      <div className="card-header">
        <h2>My visit</h2>
        <div className="dropdown">
          <MonthSelection />
        </div>
      </div>

      <div className="donut-grid">
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 92 }}>
            <span>92%</span>
          </div>
          <p>Algorithms structures</p>
        </div>
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 83 }}>
            <span>83%</span>
          </div>
          <p>Object program.</p>
        </div>
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 78 }}>
            <span>78%</span>
          </div>
          <p>Database program.</p>
        </div>
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 97 }}>
            <span>97%</span>
          </div>
          <p>Web develop.</p>
        </div>
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 96 }}>
            <span>96%</span>
          </div>
          <p>Mobile application</p>
        </div>
        <div className="donut-item">
          <div className="donut" style={{ "--pct": 89 }}>
            <span>89%</span>
          </div>
          <p>Machine learning</p>
        </div>
      </div>
    </section>
  );
}

export function MonthSelection() {
  return (
    <select>
      <option>January</option>
      <option>Febuary</option>
      <option>March</option>
      <option>April</option>
      <option>May</option>
      <option>June</option>
      <option>July</option>
      <option>August</option>
      <option>September</option>
      <option>October</option>
      <option>November</option>
      <option>December</option>
    </select>
  );
}

function TeacherCard() {
  const { user } = useContext(AuthContext);

  const linkedTecahers = teachers.filter(
    (teacher) => teacher.userId === user.id
  );
  return (
    <section className="card teachers-card">
      <div className="card-header">
        <h2>Linked Teachers</h2>
        <span className="see-all">See all</span>
      </div>

      <ul className="teacher-list">
        {linkedTecahers.map((info) => (
          <li className="teacher-item" key={info.id}>
            <div className="teacher-info">
              <div className="avatar small" />
              <div>
                <p className="teacher-name">{info.teacherName}</p>
                <p className="teacher-subject"></p>
              </div>
            </div>
            <div className="teacher-actions">
              <span className="action-icon">✉</span>
              <span className="action-icon">📞</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
