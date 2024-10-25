import React from "react";
import { useState, useEffect } from "react";
import SideMenu from "./SideMenu";

function SideNav(props) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //function handle(){
  //  console.log("clicked");
  //}
  return (
    <div className="col-md-3 side-nav">
      <div
        className={
          windowSize.width <= 500
            ? "collapse navbar-collapse"
            : "navbar-collapse"
        }
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <SideMenu
            hrefId="#HomeManagement"
            title="Home Management"
            id="HomeManagement"
            subtitle={["Edit Home"]}
          />
          <SideMenu
            hrefId="#aboutMeManagement"
            title="About Me Management"
            id="aboutMeManagement"
            subtitle={["Edit About Me"]}
          />
          <SideMenu
            hrefId="#skillManagement"
            title="Skills Management"
            id="skillManagement"
            subtitle={["Add skill", "View Skills"]}
          />
          <SideMenu
            hrefId="#projectManagement"
            title="Projects Management"
            id="projectManagement"
            subtitle={["Add Project", "View Projects"]}
          />
          <SideMenu
            hrefId="#emailManagement"
            title="Emails Management"
            id="emailManagement"
            subtitle={["View Emails"]}
          />
          <SideMenu
            hrefId="#socialManagement"
            title="Socials Management"
            id="socialManagement"
            subtitle={["Add Socials"]}
          />
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
/*
<SideMenu
            hrefId="#adminManagement"
            title="Admin Management"
            id="adminManagement"
            subtitle={["Add Admin", "View Admins"]}
          />
          */
