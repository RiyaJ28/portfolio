import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceItem from "./experienceItem"; // Import the reusable component

function Experience() {
  const [experiences, setExperiences] = useState([]);

  // Fetch experiences from backend
  useEffect(() => {
    axios.get("https://portfolio-backend-5cf0.onrender.com/viewExperiences") // Update the API URL accordingly
      .then((response) => {
        setExperiences(response.data); // Assume backend sends an array of experiences
        
      })
      .catch((error) => {
        /*setExperiences([
            {
              "start": "Nov-2024",
              "end": "Jan-2025",
              "companyName": "Renxo Technology",
              "position": "Software Engineer",
              "responsibilities": [
                "Developed a web application using React and Node.js",
                "Implemented API integration and optimized performance"
              ]
            },
            {
              "start": "Feb-2023",
              "end": "Dec-2023",
              "companyName": "Tech Solutions",
              "position": "Frontend Developer",
              "responsibilities": [
                "Worked on UI/UX improvements",
                "Enhanced website responsiveness"
              ]
            }
          ]
          )*/
        console.error("Error fetching experiences:", error);
      });
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center pb-5">Experience</h1>
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            start={exp.start}
            end={exp.end}
            companyName={exp.companyName}
            position={exp.position}
            responsibilities={exp.responsibilities}
          />
        ))
      ) : (
        <p className="text-center">Loading experiences...</p>
      )}
    </div>
  );
}

export default Experience;
