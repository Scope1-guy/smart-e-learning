import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Assessments.css";
import { MonthSelection } from "../Dashboard/Content Grid/Col-main/col-main";
import enrollments from "../../data/enrollment";
// import { lessons } from "../../data/courses";
import assessments from "../../data/userAssessment";
import programs from "../../data/program";

function Assessments() {
  const { user } = useContext(AuthContext);

  const userEnrollment = enrollments.filter((e) => e.userId === user.id);
  const userProgramId = userEnrollment.map((e) => e.programId);
  const programId = programs.filter((e) => userProgramId.includes(e.id));

  const myAssessment = assessments.filter((a) => a.userId === user.id);

  return (
    <div className="app">
      <div className="main-wrapper">
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
            <p className="summary-value">87%</p>
          </div>
          <div className="card summary-card">
            <p className="summary-label">Completed</p>
            <p className="summary-value">14</p>
          </div>
          <div className="card summary-card">
            <p className="summary-label">Upcoming</p>
            <p className="summary-value">3</p>
          </div>
          <div className="card summary-card">
            <p className="summary-label">Missed</p>
            <p className="summary-value">1</p>
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
              <span>Type</span>
              <span>Due date</span>
              <span>Status</span>
              <span>Score</span>
            </div>

            {programId.map((program) => {
              const assessments = myAssessment.find(
                (a) => a.lessonId === program.id
              );
              return (
                <div className="table-row">
                  <span className="cell-title">{program.title}</span>
                  <span>Exam</span>
                  <span>12 Dec 2023</span>
                  <span>
                    <span className="badge completed">Completed</span>
                  </span>
                  <span>{assessments.score}/100</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Assessments;
