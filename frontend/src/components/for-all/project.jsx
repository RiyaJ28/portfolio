import React from "react";
import ProjectCard from "./projectCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

function Project() {
  const centerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        type: "spring",
        bounce: 0.1,
      },
    },
  };

  const [state, setState] = useState("more");

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      // Make a GET request to your backend endpoint
      const response = await axios.get("http://localhost:5000/viewProjects"); // Adjust the endpoint accordingly
      //console.log(response.data);
      setData(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
    fetchData();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const show = () => {
    if (state === "more") {
      setState("less");
      //console.log(state);
    } else {
      setState("more");
      // Reset data to null or an empty value when state is false
      //console.log(state);
    }
  };
  return (
    <motion.div
      variants={centerVariants}
      initial="hidden"
      whileInView="visible"
      className="project"
      id="project"
    >
      <h1 className="text-center pb-2">Projects</h1>
      <p className="text-center pb-3">
        All the project I have done over the years
      </p>
      <div className="d-flex justify-content-center row">
        {data.map((dat, index) =>
          (index < 3) & (state === "more") ? (
            <ProjectCard
              className="col-md-3"
              src={dat.image}
              title={dat.name}
              des={dat.description}
              skills={dat.technology}
              webLink={dat.webLink}
            />
          ) : null
        )}
        {data.map((dat, index) =>
          (index === 3) & (windowSize.width > 1400) & (state === "more") ||
          (index === 3) & (windowSize.width < 1000) & (state === "more") ? (
            <ProjectCard
              className="col-md-3"
              src={dat.image}
              title={dat.name}
              des={dat.description}
              skills={dat.technology}
              webLink={dat.webLink}
            />
          ) : null
        )}
        {data.map((dat, index) =>
          state === "less" ? (
            <ProjectCard
              className="col-md-3"
              src={dat.image}
              title={dat.name}
              des={dat.description}
              skills={dat.technology}
              webLink={dat.webLink}
            />
          ) : null
        )}
      </div>
      <h4 className="text-center" onClick={show}>
        View {state}
      </h4>
    </motion.div>
  );
}

export default Project;
/*
<ProjectCard
          className="col-md-3"
          src={c}
          title="Spotify Clone"
          des="this is a clone of spotify made using spotify API"
          skills={["API", "MERN"]}
        />
        <ProjectCard
          className="col-md-3"
          src={c}
          title="Spotify Clone"
          des="this is a clone of spotify made using spotify API"
          skills={["API", "MERN"]}
        />
        <ProjectCard
          className="col-md-3"
          src={c}
          title="Spotify Clone"
          des="this is a clone of spotify made using spotify API"
          skills={["API", "MERN"]}
        />
        <ProjectCard
          className="col-md-3"
          src={c}
          title="Spotify Clone"
          des="this is a clone of spotify made using spotify API"
          skills={["API", "MERN"]}
        /> */
