import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import userCalendar from "../../../../data/calendar";

const upcomingList = [
  {
    icon: "🎮",
    eventName: `The main event in your life &quot;Robot Fest&quot; will be coming soon...`,
    date: "12th, December, 2026",
    time: "12:00",
    amPm: "pm",
  },
  {
    icon: "🖥",
    eventName: `Webinar of new tools in Minecraft`,
    date: "22th, January, 2027",
    time: "11:00",
    amPm: "am",
  },
];

export default function ColSide() {
  return (
    <div className="col-side">
      {/* Calendar */}
      <CalendarCard />

      {/* Upcoming events */}
      <UpcomingEvent />
    </div>
  );
}

function CalendarCard() {
  const { user } = useContext(AuthContext);

  const calendarTasks = userCalendar.filter((task) => task.userId === user.id);

  const [activeLesson, setActiveLesson] = useState(calendarTasks[0]);
  return (
    <section className="card calendar-card">
      <div className="card-header">
        <h2>Calendar</h2>
        <button className="pill-btn">Today</button>
      </div>
      <p className="calendar-subtitle">{calendarTasks.length} events today</p>
      <ul className="calendar-list">
        {calendarTasks.map((cal) => (
          <li
            className={
              activeLesson === cal
                ? "calendar-item highlighted"
                : "calendar-item"
            }
            onClick={() => setActiveLesson(cal)}
          >
            <span className="time">{cal.time}:00</span>
            <div className="event-bar" />
            <div className="event-info">
              <span className="event-icon">{cal.eventIcon}</span>
              <div>
                <p className="event-title">{cal.eventTitle}</p>
                <p className="event-time">
                  {cal.eventStartTime} - {cal.eventEndTime}.{" "}
                  {cal.numberOfLesson} lesson
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function UpcomingEvent() {
  return (
    <section className="card upcoming-card">
      <div className="card-header">
        <h2>Upcoming events</h2>
        <span className="see-all">See all</span>
      </div>

      <ul className="upcoming-list">
        {upcomingList.map((up) => (
          <li className="upcoming-item">
            <div className="upcoming-icon">{up.icon}</div>
            <div className="upcoming-info">
              <p className="upcoming-title">{up.eventName}</p>
              <p className="upcoming-date">
                {up.date}, {up.time} {up.amPm}
              </p>
            </div>
            <span className="dots">⋮</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
