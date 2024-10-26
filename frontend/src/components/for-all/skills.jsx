import React from "react";
import SkillCard from "./skillCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Skills() {
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
      const response = await axios.get( "https://portfolio-backend-5cf0.onrender.com/viewSkills"); // Adjust the endpoint accordingly
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
      console.log(state);
    } else {
      setState("more");
      // Reset data to null or an empty value when state is false
      console.log(state);
    }
  };

  return (
    <motion.div
      variants={centerVariants}
      initial="hidden"
      whileInView="visible"
      className="skills container"
    >
      <h1 className="text-center pb-5">Skills</h1>
      <div className="row d-flex justify-content-center">
        {data.map((dat, index) =>
          (index < 3) & (state === "more") ? (
              <SkillCard
                title={dat.name}
                des={dat.description}
                id={index}
                className="col-md-3"
                class={`progress-bar w-${dat.progress}`}
                src={dat.image}
              />
          ) : null
        )}

        {data.map((dat, index) =>
          (index === 3) & (windowSize.width > 1400) & (state === "more") ||
          (index === 3) & (windowSize.width < 1000) & (state === "more") ? (
            <SkillCard
              title={dat.name}
              id={index}
              des={dat.description}
              className="col-md-3"
              class={`progress-bar w-${dat.progress}`}
              src={dat.image}
            />
          ) : null
        )}
        {data.map((dat, index) =>
          state === "less" ? (
            <SkillCard
              title={dat.name}
              id={index}
              des={dat.description}
              className="col-md-3"
              class={`progress-bar w-${dat.progress}`}
              src={dat.image}
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

export default Skills;
