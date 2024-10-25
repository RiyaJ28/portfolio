import React, { useEffect } from "react";
import { useState } from "react";
import axios  from "axios";

function EditHome() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  });
  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/editHome", data);
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
  <div className="col-md-9 col-sm-12 p-5">
    <h1>Edit Home Page</h1>
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          First Name
        </label>
        <input
          type="text"
          class="form-control"
          name="firstName"
          id="exampleInputEmail1"
          value={data.firstName}
          onChange={handleChange}
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Last Name
        </label>
        <input
          type="text"
          class="form-control"
          name="lastName"
          id="exampleInputEmail1"
          value={data.lastName}
          onChange={handleChange}
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Description
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          name="description"
          value={data.description}
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

export default EditHome;
