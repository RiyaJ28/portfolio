import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function AddProject() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    webLink: "",
  });
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [skillName, setSkillName] = useState([]);

  // Handle input field changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle select change for technology options
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Option selected:", selectedOption);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const technology = selectedOption.map((tech) => tech.value);

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("webLink", data.webLink);
    formData.append("image", image);
    formData.append("technology", JSON.stringify(technology)); // Convert array to string

    try {
      const response = await axios.post(
        "https://portfolio-backend-5cf0.onrender.com/addProject",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data.success === true) {
        alert("Project added successfully");
        navigate("/dashboard", {
          state: { state: true, page: "View Projects" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add project. Please try again.");
    }

    // Reset form
    setData({ name: "", description: "", webLink: "" });
    setImage(null);
    setSelectedOption([]);
  };

  // Fetch available skills for the select dropdown
  const fetchSkills = async () => {
    try {
      const response = await axios.get("https://portfolio-backend-5cf0.onrender.com/skillName"); // Adjust the endpoint
      console.log(response.data.skillNames);
      setSkillName(response.data.skillNames);
    } catch (error) {
      console.error("Error fetching skill names:", error);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Link Field */}
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            type="text"
            className="form-control"
            name="webLink"
            value={data.webLink}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={data.description}
            className="form-control"
            rows="3"
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="input-group mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
            accept=".png, .jpg, .jpeg, .svg"
            required
          />
          <label className="input-group-text">Upload</label>
        </div>

        {/* Technology Select */}
        <div className="mb-3">
          <label className="form-label">Select Technology</label>
          <Select
            value={selectedOption}
            isMulti={true} // Proper boolean
            isSearchable={true}
            onChange={handleSelectChange}
            options={skillName} // Dynamic options fetched from the backend
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProject;
