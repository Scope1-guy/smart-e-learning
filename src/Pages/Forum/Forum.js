import React from "react";
import "../Shell.css";
import "./Forum.css";

function Forum() {
  return (
    <>
      {/* Page heading */}
      <ForumPageHeading />

      {/* Filter tabs */}
      <ForumFilterTab />

      {/* Thread list */}
      <ForumThreadList />
    </>
  );
}

function ForumPageHeading() {
  return (
    <div className="page-heading">
      <div>
        <h1>Forum</h1>
        <p>Ask questions and discuss lessons with classmates</p>
      </div>
      <button className="pill-btn">+ New topic</button>
    </div>
  );
}

function ForumFilterTab() {
  return (
    <div className="tab-bar">
      <span className="tab active">All topics</span>
      <span className="tab">Programming</span>
      <span className="tab">Web development</span>
      <span className="tab">General</span>
    </div>
  );
}

function ForumThreadList() {
  return (
    <section className="card thread-card">
      <ul className="thread-list">
        <li className="thread-item">
          <div className="avatar small" />
          <div className="thread-body">
            <div className="thread-top">
              <span className="thread-tag">Programming</span>
              <span className="thread-time">2 hours ago</span>
            </div>
            <h3 className="thread-title">
              Best approach for recursive sorting algorithms?
            </h3>
            <p className="thread-excerpt">
              I'm struggling to understand when to use merge sort vs quick sort
              for large datasets. Can someone break down the trade-offs...
            </p>
            <div className="thread-meta">
              <span>by Daniel Cruz</span>
              <span>💬 12 replies</span>
              <span>❤ 34 likes</span>
            </div>
          </div>
        </li>

        <li className="thread-item">
          <div className="avatar small" />
          <div className="thread-body">
            <div className="thread-top">
              <span className="thread-tag">Web development</span>
              <span className="thread-time">5 hours ago</span>
            </div>
            <h3 className="thread-title">
              Flexbox vs Grid - when to use which?
            </h3>
            <p className="thread-excerpt">
              Working on the responsive layout assignment and not sure if I
              should use CSS grid or flexbox for the card sections...
            </p>
            <div className="thread-meta">
              <span>by Sophia Lee</span>
              <span>💬 8 replies</span>
              <span>❤ 21 likes</span>
            </div>
          </div>
        </li>

        <li className="thread-item">
          <div className="avatar small" />
          <div className="thread-body">
            <div className="thread-top">
              <span className="thread-tag">General</span>
              <span className="thread-time">1 day ago</span>
            </div>
            <h3 className="thread-title">Study group for final assessments</h3>
            <p className="thread-excerpt">
              Anyone interested in forming a study group before the December
              assessments? Thinking of meeting twice a week online...
            </p>
            <div className="thread-meta">
              <span>by Marcus Webb</span>
              <span>💬 26 replies</span>
              <span>❤ 48 likes</span>
            </div>
          </div>
        </li>

        <li className="thread-item">
          <div className="avatar small" />
          <div className="thread-body">
            <div className="thread-top">
              <span className="thread-tag">Programming</span>
              <span className="thread-time">2 days ago</span>
            </div>
            <h3 className="thread-title">
              Robotics lesson 23 - motor calibration issue
            </h3>
            <p className="thread-excerpt">
              My robot arm keeps overshooting the target angle during the
              calibration exercise from lesson 23. Any tips on...
            </p>
            <div className="thread-meta">
              <span>by Ava Thompson</span>
              <span>💬 5 replies</span>
              <span>❤ 9 likes</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Forum;
