import React from "react";
import MenuItems from "./MenuItems";

function SideMenu(props) {
  const menuItems = props.subtitle;
 //function handle(){
 // console.log("clicked");
 //}
  return (
    <li className="menu">
      <p>
        <a
          className="sidenav-link"
          data-bs-toggle="collapse"
          href={props.hrefId}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {props.title}
        </a>
      </p>
      <div className="collapse" id={props.id}>
        <MenuItems items={menuItems}/>
      </div>
    </li>
  );
}

export default SideMenu;
