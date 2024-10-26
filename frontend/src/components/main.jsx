import React from "react";
import Header from "./for-all/header";
import Home from "./for-all/home";
import About from "./for-all/about";
import Skills from "./for-all/skills";
import Project from "./for-all/project";
import Contact from "./for-all/contact";
import Footer from "./for-all/footer";
import {motion} from "framer-motion";


function Main() {
  return (
    
    <motion.div >
      <Header />
      <Home />
      <About />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Main;
