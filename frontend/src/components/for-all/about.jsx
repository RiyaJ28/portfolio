import React from "react";
import AboutImage from "./aboutImage";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

function About() {
  const [data, setData] = useState({
    aboutMe: "",
  });

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
  const leftSideVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 2,
        bounce: 0.3,
        delay: 0.5,
      },
    },
  };
  const rightSideVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 2,
        bounce: 0.3,
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/aboutMeData"
        ); // Adjust the endpoint accordingly
        //console.log(response.data);
        setData({
          aboutMe: response.data.aboutMe,
        });
        //setData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <motion.div
      variants={centerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="about "
      id="About"
    >
      <div className="container">
        <h1 className="text-center ">Who am I?</h1>
        <div className="row about-main">
          <motion.div
            variants={leftSideVariants}
            initial="hidden"
            whileInView="visible"
            className="col-md-6 about-text col-sm-7"
          >
            <p>{data.aboutMe}</p>
          </motion.div>
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            whileInView="visible"
            className="col-md-6 col-sm-3"
          >
            <AboutImage />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
