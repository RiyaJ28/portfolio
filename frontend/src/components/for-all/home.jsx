import React from "react";
import SVGComponent from "./Working-pana";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Typewriter }  from "react-simple-typewriter";

function Home() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Make a GET request to your backend endpoint
            const response = await axios.get('http://localhost:5000/editHomeData'); // Adjust the endpoint accordingly
            //console.log(response.data);
            setData({
              firstName : response.data.firstName,
              lastName : response.data.lastName,
              description : response.data.description
            })
            //setData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Call the fetchData function when the component mounts
}, [])
  return (
    <div className="home container">
    <div className="home-text">
    <h1 className="hi-Im">Hi, </h1>
    <h1 className="hi-Im">I am</h1>
    <h1>{data.firstName} {data.lastName}</h1>
    <h2> I'm 
    <span>
      <Typewriter 
        cursor
        cursorBlinking
        delaySpeed={1300}
        typeSpeed={80}
        deleteSpeed={25}
        loop={0}
        words={data.description.split(",")}
      />
    </span>
      
    </h2>
    </div>
     
     <SVGComponent className="home-img"/>
    </div>
  );
}

export default Home;