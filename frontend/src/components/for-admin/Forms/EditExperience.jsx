import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditExperience() {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = location.state || {}; // Get experience ID from navigation state


  const [experience, setExperience] = useState({
    companyName: "",
    position: "",
    start: "",
    end: "",
    responsibilities: [],
  });

  useEffect(() => {
    if (_id) {
      fetchExperience(_id);
    }
  }, [_id]);

  const fetchExperience = async (expId) => {
    try {
      const response = await axios.get(`https://portfolio-backend-5cf0.onrender.com/viewExperienceEdit` , {id: expId});
      setExperience({
        companyName: response.data.companyName,
        position: response.data.position,
        start: response.data.start,
        end: response.data.end,
        responsibilities: response.data.responsibilities || [], // Ensure it's always an array
      });
      console.log(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      alert("Failed to fetch experience data.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "responsibilities") {
      setExperience({ ...experience, responsibilities: value.split("\n") }); // Convert textarea string to array
    } else {
      setExperience({ ...experience, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://portfolio-backend-5cf0.onrender.com/editExperience/${_id}`, experience, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Experience updated successfully!");
        navigate("/dashboard", { state: { state: true, page: "View Experiences" } });
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      alert("Failed to update experience.");
    }
  };

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>{_id}</h1>
      <h1>Edit Experience</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            name="companyName"
            value={experience.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={experience.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="start"
            value={experience.start}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            name="end"
            value={experience.end}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Responsibilities</label>
          <textarea
            className="form-control"
            name="responsibilities"
            value={experience.responsibilities.join("\n")} // Convert array to string
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
          <small className="text-muted">Enter each responsibility on a new line.</small>
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditExperience;
