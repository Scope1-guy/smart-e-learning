import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
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

function LessonPageHeading() {
  const { user, enrollments } = useContext(AuthContext);

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
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAssessments = assessments.filter((a) => a.userId === user.id);

  return (
    <div className="lessons-grid">
      {myLessons.map((lesson) => {
        const assessment = myAssessments.find((a) => a.lessonId === lesson.id);

        return (
          <article className="lesson-card" key={lesson.id}>
            <div className="lesson-thumb thumb-purple">%^</div>
            <span className="lesson-tag">{lesson.section}</span>
            <h3>{lesson.title}</h3>
            <p className="lesson-teacher">Mary Johnson · 21 lessons</p>
            <div className="progress-row">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${assessment?.score ?? 0}%`,
                    background: getProgressColor(assessment?.score ?? 0),
                  }}
                />
              </div>
              <span className="progress-labelselectedProgramIds">
                {assessment?.score ?? 0}%
              </span>
            </div>
            <button className="pill-btn ghost full">Continue</button>
          </article>
        );
      })}
    </div>
  );
}

function getProgressColor(progress) {
  if (progress <= 20) return "#e74c3c";
  if (progress <= 40) return "#f4a261";
  if (progress <= 70) return "#f1c40f";
  return "#2ec4b6";
}

export default Lessons;
