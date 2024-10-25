import React  from "react";
//import { useState } from "react";
//import axios from "axios";
import Main from "./components/main";
import LogIn from "./components/for-admin/logIn";
import Dashboard from "./components/for-admin/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {


  //const handleLogout = () => {
  //  setIsLoggedIn(false);
  //};

  

  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/login" element={<LogIn/>} />
        <Route  path = "/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
//<Route path="/dashboard" element={userData === true ? <Dashboard /> : <LogIn/>}> </Route> 