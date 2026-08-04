import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Assessments.css";
import { MonthSelection } from "../Dashboard/Content Grid/Col-main/col-main";
import { lessons } from "../../data/courses";
import assessments from "../../data/userAssessment";
import programs from "../../data/program";

function Assessments() {
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );
  const myAssessments = assessments.filter((a) => a.userId === user.id);

  // One row per lesson this user has, paired with their assessment for it
  // (assessment can be undefined if they haven't been assessed on it yet)
  const rows = myLessons.map((lesson) => ({
    lesson,
    assessment: myAssessments.find((a) => a.lessonId === lesson.id),
    program: programs.find((p) => p.id === lesson.programId),
  }));

  const today = new Date();

  const completedRows = rows.filter((r) => r.assessment?.status === "Completed");
  const scored = rows.filter((r) => typeof r.assessment?.score === "number");
  const averageScore = scored.length
    ? Math.round(
        scored.reduce((sum, r) => sum + r.assessment.score, 0) / scored.length
      )
    : 0;

  const upcomingRows = rows.filter(
    (r) =>
      r.assessment &&
      r.assessment.status !== "Completed" &&
      new Date(r.assessment.dueDate) >= today
  );
  const missedRows = rows.filter(
    (r) =>
      r.assessment &&
      r.assessment.status !== "Completed" &&
      new Date(r.assessment.dueDate) < today
  );

  return (
    <>
      {/* Page heading */}
      <div className="page-heading">
        <div>
          <h1>Assessments</h1>
          <p>Track your quizzes, exams and results</p>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="summary-row">
        <div className="card summary-card">
          <p className="summary-label">Average score</p>
          <p className="summary-value">{averageScore}%</p>
        </div>
        <div className="card summary-card">
          <p className="summary-label">Completed</p>
          <p className="summary-value">{completedRows.length}</p>
        </div>
        <div className="card summary-card">
          <p className="summary-label">Upcoming</p>
          <p className="summary-value">{upcomingRows.length}</p>
        </div>
        <div className="card summary-card">
          <p className="summary-label">Missed</p>
          <p className="summary-value">{missedRows.length}</p>
        </div>
      </div>

      {/* Assessments table */}
      <section className="card assessments-card">
        <div className="card-header">
          <h2>All assessments</h2>
          <div className="dropdown">
            <MonthSelection />
          </div>
        </div>

        <div className="table">
          <div className="table-row table-head">
            <span>Subject</span>
            <span>Program</span>
            <span>Due date</span>
            <span>Status</span>
            <span>Score</span>
          </div>

          {rows.map(({ lesson, assessment, program }) => (
            <div className="table-row" key={lesson.id}>
              <span className="cell-title">{lesson.title}</span>
              <span>{program?.title}</span>
              <span>{assessment?.dueDate ?? "—"}</span>
              <span>
                <span className={getStatusBadgeClass(assessment?.status)}>
                  {assessment?.status ?? "Not started"}
                </span>
              </span>
              <span>
                {typeof assessment?.score === "number"
                  ? `${assessment.score}/100`
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function getStatusBadgeClass(status) {
  if (status === "Completed") return "badge completed";
  if (!status) return "badge pending";
  return "badge inprogress";
}

export default Assessments;
