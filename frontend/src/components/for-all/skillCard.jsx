import React from "react";

function SkillCard(props) {
  return (
    <div className="card skill-card" style={{ width: "18rem" }}>
      <div class="skill-card-header">
        <div class="img-div">
          <img src={props.src} alt="..." />
        </div>
        <div>
          <h3 style={{color: "#2c3e50"}}>{props.title}</h3>
        </div>
      </div>
      <div className="card-body">
        <p>{props.des}</p>
        <div
          className="progress "
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className={props.class} style={{backgroundColor: "#2c3e50"}}></div>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
