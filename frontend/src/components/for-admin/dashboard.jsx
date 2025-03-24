import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "./Dashboard-header";
import SideNav from "./SideNav";
import MainPage from "./MainPage";
import EditHome from "./Forms/EditHome";
import EditAboutMe from "./Forms/EditAboutMe";
import AddSkill from "./Forms/AddSkill";
import AddSocials from "./Forms/AddSocials";
import AddAdmin from "./Forms/AddAdmin";
import AddProject from "./Forms/AddProject";
import ViewSkills from "./Tables/ViewSkills";
import ViewAdmins from "./Tables/ViewAdmins";
import ViewEmails from "./Tables/ViewEmails";
import ViewProjects from "./Tables/ViewProjects";
import ViewSocials from "./Tables/ViewSocials";
import EditProject from "./Edit-Pages/EditProject";
import EditSkill from "./Edit-Pages/EditSkill";
import AddExperience from "./Forms/AddExperience";
import ViewExperiences from "./Tables/ViewExperiences";
import EditExperience from "./Forms/EditExperience";

function Dashboard() {
  const navigate = useNavigate(); // Renamed to 'navigate' for clarity
  const location = useLocation();
  //console.log(location.state);
  const stat = location.state.state;
  const page = location.state.page;
  const id = location.state.id;
  console.log(page);

  useEffect(() => {
    if (stat === false || stat === null) {
      navigate("/LogIn", { state: "please Log In First" });
    }
    // Redirect to the "/about" page when this component is loade// Empty dependency array ensures this effect runs only once
  }); 
    if (page === "main") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <MainPage />
          </div>
        </div>
      );
    } 
    else if (page === "Edit Home") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <EditHome />
          </div>
        </div>
      );
    }
    else if (page === "Edit About Me") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <EditAboutMe />
          </div>
        </div>
      );
    }
    else if( page === "Add skill"){
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <AddSkill />
          </div>
        </div>
      );
    } else if (page === "View Skills") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewSkills />
          </div>
        </div>
      );
    }
    else if (page === "Add Project") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <AddProject />
          </div>
        </div>
      );
    }
    else if (page === "View Projects") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewProjects />
          </div>
        </div>
      );
    }
    else if (page === "View Emails") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewEmails />
          </div>
        </div>
      );
    }
    else if (page === "Add Socials") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <AddSocials />
          </div>
        </div>
      );
    }
    else if (page === "View Socials") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewSocials />
          </div>
        </div>
      );
    }
    else if (page === "Add Admin") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <AddAdmin />
          </div>
        </div>
      );
    }
    else if (page === "View Admins") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewAdmins />
          </div>
        </div>
      );
    }
    else if (page === "Edit Project") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <EditProject id={id}/>
          </div>
        </div>
      );
    }
    else if (page === "Edit Skill") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <EditSkill id={id}/>
          </div>
        </div>
      );
    }else if (page === "Add Experience") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <AddExperience />
          </div>
        </div>
      );
    }
    else if (page === "View Experiences") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <ViewExperiences />
          </div>
        </div>
      );
    }
    else if (page === "Edit Experience") {
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <EditExperience id={id}/>
          </div>
        </div>
      );
    }
    
    else{
      return (
        <div className="">
          <DashboardHeader />
          <div className="row">
            <SideNav />
            <MainPage />
          </div>
        </div>
      );
    }
    // Redirect to the "/about" page when this component is loaded
 // Empty dependency array ensures this effect runs only once
}

export default Dashboard;
