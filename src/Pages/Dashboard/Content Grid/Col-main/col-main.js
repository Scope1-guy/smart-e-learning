import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import teachers from "../../../../data/teachers";
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
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAssessments = assessments.filter((a) => a.userId === user.id);

  // "New" tasks = lessons that don't have a completed assessment yet
  const newTaskCount = myLessons.filter((lesson) => {
    const assessment = myAssessments.find((a) => a.lessonId === lesson.id);
    return !assessment || assessment.status !== "Completed";
  }).length;

  return (
    <section className="greeting-card">
      <div className="greeting-text">
        <h1>Hello {user.name.split(" ")[0]}!</h1>
        <p>
          You have {newTaskCount} new task{newTaskCount === 1 ? "" : "s"}. It is
          a lot of work for today! So let's start!
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
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAssessments = assessments.filter((a) => a.userId === user.id);

  console.log("my enrollment", myEnrollments);
  console.log("my program id", myProgramIds);
  console.log("my lessons", myLessons);
  console.log("my assessment", myAssessments);

  // Find the lesson with the highest score, to headline the card
  const scoredLessons = myLessons
    .map((lesson) => ({
      lesson,
      assessment: myAssessments.find((a) => a.lessonId === lesson.id),
    }))
    .filter((item) => item.assessment);

  console.log("scored lessons", scoredLessons);

  const topEntry = scoredLessons.reduce(
    (best, item) =>
      !best || item.assessment.score > best.assessment.score ? item : best,
    null
  );

  console.log(topEntry);

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
        <span className="score">
          {topEntry ? topEntry.assessment.score : 0}
        </span>
        <span className="score-label">
          {topEntry ? topEntry.lesson.title : "No lessons yet"}
        </span>
      </div>

      <div className="bar-chart">
        {myLessons.map((lesson) => {
          const assessment = myAssessments.find(
            (a) => a.lessonId === lesson.id
          );
          return (
            <div className="bar-item" key={lesson.id}>
              <span className="bar-value">{assessment?.score ?? 0}%</span>
              <div
                className="bar"
                style={{ height: `${assessment?.score ?? 0}%` }}
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
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAssessments = assessments.filter((a) => a.userId === user.id);

  return (
    <section className="card visit-card">
      <div className="card-header">
        <h2>My visit</h2>
        <div className="dropdown">
          <MonthSelection />
        </div>
      </div>

      <div className="donut-grid">
        {myLessons.map((lesson) => {
          const assessment = myAssessments.find(
            (a) => a.lessonId === lesson.id
          );
          const pct = assessment?.score ?? 0;
          return (
            <div className="donut-item" key={lesson.id}>
              <div className="donut" style={{ "--pct": pct }}>
                <span>{pct}%</span>
              </div>
              <p>{lesson.title}</p>
            </div>
          );
        })}
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

  const linkedTeachers = teachers.filter(
    (teacher) => teacher.userId === user.id
  );
  return (
    <section className="card teachers-card">
      <div className="card-header">
        <h2>Linked Teachers</h2>
        <span className="see-all">See all</span>
      </div>

      <ul className="teacher-list">
        {linkedTeachers.map((info) => (
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
