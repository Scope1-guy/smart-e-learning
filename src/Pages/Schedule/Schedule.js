import React from "react";
import "../Shell.css";
import "./Schedule.css";

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

        {/* Hardcoded event blocks */}
        <div
          className="event-block purple"
          style={{ gridColumn: 2, gridRow: "2 / 4" }}
        >
          <p className="event-block-title">Electronics</p>
          <p className="event-block-time">8:00 - 9:45</p>
        </div>

        <div
          className="event-block blue"
          style={{ gridColumn: 3, gridRow: "3 / 5" }}
        >
          <p className="event-block-title">Robotics lesson</p>
          <p className="event-block-time">9:00 - 10:45</p>
        </div>

        <div
          className="event-block green"
          style={{ gridColumn: 4, gridRow: "5 / 7" }}
        >
          <p className="event-block-title">Database program.</p>
          <p className="event-block-time">11:00 - 12:45</p>
        </div>

        <div
          className="event-block orange"
          style={{ gridColumn: 5, gridRow: "4 / 6" }}
        >
          <p className="event-block-title">Web development</p>
          <p className="event-block-time">10:00 - 11:45</p>
        </div>

        <div
          className="event-block purple"
          style={{ gridColumn: 6, gridRow: "6 / 8" }}
        >
          <p className="event-block-title">C++ lesson</p>
          <p className="event-block-time">12:00 - 13:45</p>
        </div>

        <div
          className="event-block blue"
          style={{ gridColumn: 3, gridRow: "7 / 9" }}
        >
          <p className="event-block-title">Machine learning</p>
          <p className="event-block-time">13:00 - 14:45</p>
        </div>

        <div
          className="event-block green"
          style={{ gridColumn: 7, gridRow: "3 / 5" }}
        >
          <p className="event-block-title">Mobile app design</p>
          <p className="event-block-time">9:00 - 10:45</p>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
