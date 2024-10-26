import React from "react";
import SkillSet from "./SkillSet";

function ProjectCard(props) {
  //console.log(props.skills);
  return (
    <div className="card projectCard " style={{ width: "18rem" }}>
      <a href={props.webLink}>
        <img src={props.src} className="card-img-top" alt="..." />
      </a>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.des}</p>
        <SkillSet skills={props.skills}  />
      </div>
    </div>
  );
}

export default ProjectCard;
