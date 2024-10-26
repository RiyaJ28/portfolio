import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';

function EditAboutMe() {
  const [data , setData] = useState({
    aboutMe : "",
  });

  function  handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://portfolio-backend-5cf0.onrender.com/editAboutMe", data);
      console.log(response.data);
      //setFormData({ name: "", email: "", message: "" });
      // Handle success (optional)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (optional)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Make a GET request to your backend endpoint
            const response = await axios.get('https://portfolio-backend-5cf0.onrender.com/aboutMeData'); // Adjust the endpoint accordingly
            //console.log(response.data);
            setData({
              aboutMe : response.data.aboutMe
            })
            //setData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Call the fetchData function when the component mounts
}, [])

  return (
    <div className='col-md-9 col-sm-12 p-5'>
    <h1>Edit About Me</h1><form onSubmit={handleSubmit}>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">
        About Me Paragraph
      </label>
      <textarea onChange={handleChange} name='aboutMe'value={data.aboutMe} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div> 
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form></div>
  )
}

export default EditAboutMe