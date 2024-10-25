import React from "react";
import { useNavigate } from "react-router-dom";

function MenuItems(props) {
  const history = useNavigate();
  const items = props.items;
  function handleClick(item) {
    //console.log("clicked");
    console.log(item);
    history("/dashboard" , {state:{state:true , page:item}});
  }

  return (
    <ul>
      {items.map((item) => (
        <li className="menu"  onClick={() => handleClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default MenuItems;
