import React from "react";

function SkillSet(props) {
  let item = props.skills;
  
  const items = item.split(',');
  const datatype = typeof items;
  console.log(datatype);
  return (
    <div style={{display:"none"}}>
      {items.map((item, index) => (
        <p className="skillSet">{item}</p>
      ))}
    </div>
  );
}

export default SkillSet;
