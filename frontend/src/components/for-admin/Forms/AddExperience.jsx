import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddExperience() {
  const navigate = useNavigate();
  const [experience, setExperience] = useState({
    companyName: "",
    position: "",
    start: "",
    end: "",
    responsibilities: [],
  });

  function handleChange(e) {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  }

  // Handle multiple responsibilities
  const handleResponsibilitiesChange = (e) => {
    const values = e.target.value.split("\n"); // Convert textarea input into an array
    setExperience({ ...experience, responsibilities: values });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    //const formData = new FormData();
    //formData.append("companyName", experience.companyName);
    //formData.append("position", experience.position);
    //formData.append("start", experience.start);
    //formData.append("end", experience.end);
    //formData.append("responsibilities", experience.responsibilities);
    //console.log(formData);
    console.log(experience);
    try {
      const response = await axios.post(
        //"https://portfolio-backend-5cf0.onrender.com/addExperience",
        "https://portfolio-backend-5cf0.onrender.com/addExperience",
        experience
      );

      console.log(response.data);
      setExperience({ companyName: "", position: "", start: "", end: "", responsibilities: "" });

      if (response.status === 201) {
        alert("Experience added successfully!");
        navigate("/dashboard", { state: { state: true, page: "View Experiences" } });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add experience.");
    }
  };

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Add Experience</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input type="text" className="form-control" name="companyName" value={experience.companyName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input type="text" className="form-control" name="position" value={experience.position} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" name="start" value={experience.start} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="date" className="form-control" name="end" value={experience.end} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Responsibilities</label>
          <textarea
            name="responsibilities"
            className="form-control"
            value={experience.responsibilities.join("\n")}
            onChange={handleResponsibilitiesChange}
            rows="3"
            placeholder="Enter responsibilities, one per line"
            required
          ></textarea>
        </div>



        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddExperience;
