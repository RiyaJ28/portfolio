import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function AddSocials() {
  const [data, setData] = useState({
    email: "",
    instagram: "",
    linkedIn: "",
    gitHub: "",
  });

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://portfolio-backend-5cf0.onrender.com/editSocials",
        data
      );
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
        const response = await axios.get(
          "https://portfolio-backend-5cf0.onrender.com/editSocialData"
        ); // Adjust the endpoint accordingly
        //            //console.log(response.data);
        setData({
          email: response.data.email,
          instagram: response.data.instagram,
          gitHub: response.data.gitHub,
          linkedIn: response.data.linkedIn,
        });
        //setData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Edit Socials</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email
          </label>
          <input
            type="text"
            class="form-control"
            name="email"
            id="exampleInputEmail1"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            LinkedIn
          </label>
          <input
            type="text"
            class="form-control"
            name="linkedIn"
            id="exampleInputEmail1"
            value={data.linkedIn}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            GitHub
          </label>
          <input
            type="text"
            class="form-control"
            name="gitHub"
            id="exampleInputEmail1"
            value={data.gitHub}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Instagram
          </label>
          <input
            type="text"
            class="form-control"
            name="instagram"
            id="exampleInputEmail1"
            value={data.instagram}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSocials;
