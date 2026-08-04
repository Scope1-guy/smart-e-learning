import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { lessons } from "../../data/courses";
import "../Shell.css";
import "./Schedule.css";

const eventColors = ["purple", "blue", "green", "orange"];

function Schedule() {
  return (
    <>
      {/* Page heading */}
      <SchedulePageHeading />

      {/* Weekly calendar card */}
      <WeeklyCalendarCard />
    </>
  );
}

function SchedulePageHeading() {
  return (
    <div className="page-heading">
      <div>
        <h1>Schedule</h1>
        <p>Week of 18 - 24 December 2023</p>
      </div>
      <div className="week-nav">
        <button className="nav-arrow">‹</button>
        <span className="week-range">18 - 24 December</span>
        <button className="nav-arrow">›</button>
        <button className="pill-btn">Today</button>
      </div>
    </div>
  );
}

function WeeklyCalendarCard() {
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myLessons = lessons.filter((lesson) =>
    myProgramIds.includes(lesson.programId)
  );

  return (
    <section className="card schedule-card">
      <div className="week-grid">
        {/* Header row: time gutter + 7 days */}
        <div className="grid-cell head-cell time-gutter" />
        <div className="grid-cell head-cell">
          <span className="day-name">Mon</span>
          <span className="day-num">18</span>
        </div>
        <div className="grid-cell head-cell today">
          <span className="day-name">Tue</span>
          <span className="day-num">19</span>
        </div>
        <div className="grid-cell head-cell">
          <span className="day-name">Wed</span>
          <span className="day-num">20</span>
        </div>
        <div className="grid-cell head-cell">
          <span className="day-name">Thu</span>
          <span className="day-num">21</span>
        </div>
        <div className="grid-cell head-cell">
          <span className="day-name">Fri</span>
          <span className="day-num">22</span>
        </div>
        <div className="grid-cell head-cell">
          <span className="day-name">Sat</span>
          <span className="day-num">23</span>
        </div>
        <div className="grid-cell head-cell">
          <span className="day-name">Sun</span>
          <span className="day-num">24</span>
        </div>

        {/* Time gutter labels */}
        <div className="time-label" style={{ gridRow: 2 }}>
          08:00
        </div>
        <div className="time-label" style={{ gridRow: 3 }}>
          09:00
        </div>
        <div className="time-label" style={{ gridRow: 4 }}>
          10:00
        </div>
        <div className="time-label" style={{ gridRow: 5 }}>
          11:00
        </div>
        <div className="time-label" style={{ gridRow: 6 }}>
          12:00
        </div>
        <div className="time-label" style={{ gridRow: 7 }}>
          13:00
        </div>
        <div className="time-label" style={{ gridRow: 8 }}>
          14:00
        </div>
        <div className="time-label" style={{ gridRow: 9 }}>
          15:00
        </div>
        <div className="time-label" style={{ gridRow: 10 }}>
          16:00
        </div>

        {/* Row grid lines (background cells) */}
        {Array.from({ length: 9 * 7 }).map((_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{
              gridColumn: (i % 7) + 2,
              gridRow: Math.floor(i / 7) + 2,
            }}
          />
        ))}

        {/* Lesson event blocks, placed using each lesson's own date + time */}
        {myLessons.map((lesson, index) => {
          // getDay() returns 0 for Sunday, 1 for Monday, ... 6 for Saturday.
          // Our columns go Mon(2) -> Sun(8), so Sunday needs to map to 8.
          const dayOfWeek = new Date(lesson.date).getDay();
          const gridColumn = dayOfWeek === 0 ? 8 : dayOfWeek + 1;

          const hour = parseInt(lesson.time.split(":")[0], 10);
          const gridRow = hour - 6; // 08:00 -> row 2, 09:00 -> row 3, etc.

          // Only place it on the grid if it falls within the visible 08:00-16:00 range
          if (gridRow < 2 || gridRow > 10) return null;

          return (
            <div
              key={lesson.id}
              className={`event-block ${eventColors[index % eventColors.length]}`}
              style={{ gridColumn, gridRow: `${gridRow} / ${gridRow + 2}` }}
            >
              <p className="event-block-title">{lesson.title}</p>
              <p className="event-block-time">{lesson.time}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Schedule;
