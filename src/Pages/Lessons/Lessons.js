import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import courses from "../../data/courses";
// import teachers from "../../data/teachers";
import enrollments from "../../data/enrollment";
import { lessons } from "../../data/courses";
import assessments from "../../data/userAssessment";
import "../Shell.css";
import "./Lessons.css";

function Lessons() {
  return (
    <>
      {/* Page heading */}
      <LessonPageHeading />

      {/* Filter tabs */}
      <LessonFilterTab />

      {/* Lessons grid */}
      <LessonsGrid />
    </>
  );
}

// <div className="main-wrapper">

function LessonPageHeading() {
  const { user } = useContext(AuthContext);

  const myCourses = courses.filter((course) => course.userId === user.id);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );

  return (
    <div className="page-heading">
      <div>
        <h1>Lessons</h1>
        <p>You have {myLessons.length} lessons in progress this semester</p>
      </div>
      <button className="pill-btn">+ Enroll new lesson</button>
    </div>
  );
}

function LessonFilterTab() {
  return (
    <div className="tab-bar">
      <span className="tab active">All lessons</span>
      <span className="tab">In progress</span>
      <span className="tab">Completed</span>
      <span className="tab">Saved</span>
    </div>
  );
}

function LessonsGrid() {
  const { user } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAsessments = assessments.filter((a) => a.userId === user.id);

  // const myCourses = courses.filter((course) => course.userId === user.id);
  return (
    <div className="lessons-grid">
      {myLessons.map((course) => {
        const assessment = myAsessments.find((a) => a.lessonId === course.id);

        console.log(myAsessments);
        console.log(assessment);

        return (
          <article className="lesson-card">
            <div className="lesson-thumb thumb-purple">%^</div>
            <span className="lesson-tag">{course.section}</span>
            <h3>{course.title}</h3>
            <p className="lesson-teacher">Mary Johnson · 21 lessons</p>
            <div className="progress-row">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${assessment?.score ?? 0}%`,
                    background: getProgressCOlor(assessment?.score ?? 0),
                  }}
                />
              </div>
              <span className="progress-label">{assessment?.score ?? 0}%</span>
            </div>
            <button className="pill-btn ghost full">Continue</button>
          </article>
        );
      })}
    </div>
  );
}

function getProgressCOlor(progress) {
  if (progress <= 20) return "#e74c3c";
  if (progress <= 40) return "#f4a261";
  if (progress <= 70) return "#f1c40f";
  return "#2ec4b6";
}

// function LessonsGrid() {
//   const {user} = useContext(AuthContext);

//   const myCourses = courses.filter((course) => course.userId === user.id)
//   return (
//     <div className="lessons-grid">
//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-purple">🖥</div>
//         <span className="lesson-tag">Programming</span>
//         <h3>Introduction to Algorithms</h3>
//         <p className="lesson-teacher">Mary Johnson · 21 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "85%" }} />
//           </div>
//           <span className="progress-label">85%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>

//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-blue">🧩</div>
//         <span className="lesson-tag">Programming</span>
//         <h3>Object Oriented Programming</h3>
//         <p className="lesson-teacher">Mary Johnson · 18 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "72%" }} />
//           </div>
//           <span className="progress-label">72%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>

//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-green">🗄</div>
//         <span className="lesson-tag">Database</span>
//         <h3>Database Programming</h3>
//         <p className="lesson-teacher">James Brown · 16 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "70%" }} />
//           </div>
//           <span className="progress-label">70%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>

//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-orange">🌐</div>
//         <span className="lesson-tag">Web</span>
//         <h3>Web Development Basics</h3>
//         <p className="lesson-teacher">Mary Johnson · 22 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "46%" }} />
//           </div>
//           <span className="progress-label">46%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>

//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-pink">📱</div>
//         <span className="lesson-tag">Mobile</span>
//         <h3>Mobile Application Design</h3>
//         <p className="lesson-teacher">James Brown · 14 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "44%" }} />
//           </div>
//           <span className="progress-label">44%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>

//       <article className="lesson-card">
//         <div className="lesson-thumb thumb-teal">🤖</div>
//         <span className="lesson-tag">AI</span>
//         <h3>Machine Learning Fundamentals</h3>
//         <p className="lesson-teacher">Mary Johnson · 20 lessons</p>
//         <div className="progress-row">
//           <div className="progress-track">
//             <div className="progress-fill" style={{ width: "74%" }} />
//           </div>
//           <span className="progress-label">74%</span>
//         </div>
//         <button className="pill-btn ghost full">Continue</button>
//       </article>
//     </div>
//   );
// }

export default Lessons;
