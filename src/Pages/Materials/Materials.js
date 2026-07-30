import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Materials.css";
import enrollments from "../../data/enrollment";
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

      {/* Algorithms subject group */}
      <AlgorithmSubjectGroup />

      {/* Web development subject group */}
      {/* <WebDevelopmentSubjectGroup /> */}
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

function AlgorithmSubjectGroup() {
  const { user } = useContext(AuthContext);

  const userEnrollment = enrollments.filter((e) => e.userId === user.id);
  const userProgramId = userEnrollment.map((e) => e.programId);
  const programId = programs.filter((e) => userProgramId.includes(e.id));
  console.log(userProgramId);
  console.log(programId);

  return (
    <div>
      {programId.map((program) => {
        const programLessons = lessons.filter(
          (lesson) => lesson.programId === program.id
        );

        return (
          <section className="card material-group">
            <div className="card-header">
              <h2>{program.title}</h2>
              <span className="see-all">See all</span>
            </div>

            <ul className="material-list">
              {programLessons.map((lesson) => {
                const material = lessonMaterials.filter(
                  (m) => m.lessonId === lesson.id
                );

                return (
                  <div>
                    <h3>{lesson.section}</h3>

                    {material.map((material) => {
                      return (
                        <li className="material-item">
                          <div className="file-icon pdf">PDF</div>
                          <div className="material-info">
                            <p></p>
                            <p className="material-title">{material.fileUrl}</p>
                            <p className="material-meta">
                              {material.materialsMB} MB · Uploaded{" "}
                              {material.dateUploaded}
                            </p>
                          </div>
                          <span className="download-icon">⬇</span>
                        </li>
                      );
                    })}
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

// function WebDevelopmentSubjectGroup() {
//   return (
//     <section className="card material-group">
//       <div className="card-header">
//         <h2>Web Development</h2>
//         <span className="see-all">See all</span>
//       </div>

//       <ul className="material-list">
//         <li className="material-item">
//           <div className="file-icon doc">DOC</div>
//           <div className="material-info">
//             <p className="material-title">HTML &amp; CSS cheat sheet.docx</p>
//             <p className="material-meta">640 KB · Uploaded 5 Dec 2023</p>
//           </div>
//           <span className="download-icon">⬇</span>
//         </li>
//         <li className="material-item">
//           <div className="file-icon pdf">PDF</div>
//           <div className="material-info">
//             <p className="material-title">Responsive design guidelines.pdf</p>
//             <p className="material-meta">1.8 MB · Uploaded 2 Dec 2023</p>
//           </div>
//           <span className="download-icon">⬇</span>
//         </li>
//       </ul>
//     </section>
//   );
// }

export default Materials;
