import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Materials.css";
import programs from "../../data/program";
import { lessons } from "../../data/courses";
import lessonMaterials from "../../data/lessonMaterials";

function Materials() {
  return (
    <>
      {/* Page heading */}
      <MaterialPageHeading />

      {/* Filter tabs */}
      <MaterialFilterTab />

      {/* Program subject groups */}
      <SubjectGroups />
    </>
  );
}

function MaterialPageHeading() {
  return (
    <div className="page-heading">
      <div>
        <h1>Materials</h1>
        <p>All lesson resources in one place</p>
      </div>
      <button className="pill-btn">+ Upload material</button>
    </div>
  );
}

function MaterialFilterTab() {
  return (
    <div className="tab-bar">
      <span className="tab active">All</span>
      <span className="tab">Documents</span>
      <span className="tab">Presentations</span>
      <span className="tab">Videos</span>
    </div>
  );
}

function SubjectGroups() {
  const { user, enrollments } = useContext(AuthContext);

  const myEnrollments = enrollments.filter((e) => e.userId === user.id);
  const myProgramIds = myEnrollments.map((e) => e.programId);
  const myPrograms = programs.filter((p) => myProgramIds.includes(p.id));

  return (
    <div>
      {myPrograms.map((program) => {
        const programLessons = lessons.filter(
          (lesson) => lesson.programId === program.id
        );

        return (
          <section className="card material-group" key={program.id}>
            <div className="card-header">
              <h2>{program.title}</h2>
              <span className="see-all">See all</span>
            </div>

            <ul className="material-list">
              {programLessons.map((lesson) => {
                const materials = lessonMaterials.filter(
                  (m) => m.lessonId === lesson.id
                );

                return (
                  <div key={lesson.id}>
                    <h3>{lesson.section}</h3>

                    {materials.map((material) => (
                      <li className="material-item" key={material.id}>
                        <div className="file-icon pdf">PDF</div>
                        <div className="material-info">
                          <p className="material-title">{material.title}</p>
                          <p className="material-meta">
                            {material.materialsMB} MB · Uploaded{" "}
                            {material.dateUploaded}
                          </p>
                        </div>
                        <span className="download-icon">⬇</span>
                      </li>
                    ))}
                  </div>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default Materials;
