import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate} from "react-router-dom";

function EditProject(props) {
  const navigate = useNavigate();
  const id = props.id; // Assume you pass the project id via route params

  const [data, setData] = useState({
    name: "",
    description: "",
    webLink: "",
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // For displaying current image
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
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const technology = selectedOption.map((tech) => tech.value);

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("webLink", data.webLink);
    formData.append("id", id);
    if (image) {
      formData.append("image", image); // Only append the image if it's been changed
    }
    formData.append("technology", JSON.stringify(technology));

    try {
      const response = await axios.post(
        "https://portfolio-backend-5cf0.onrender.com/editProject", // Use project ID for editing
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data.success === true) {
        alert("Project updated successfully");
        navigate("/dashboard", {
          state: { state: true, page: "View Projects" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  const fetchProjectData = useCallback(async () => {
    try {
      const response = await axios.get("https://portfolio-backend-5cf0.onrender.com/viewProjectEdit", { params: { id } });
      const project = response.data;
      setData({
        name: project.name,
        description: project.description,
        webLink: project.webLink,
      });
      setCurrentImage(project.image); // Store the current image
      const technologies = project.technology.map((tech) => ({
        value: tech,
        label: tech,
      }));
      setSelectedOption(technologies);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }, [id]); // Dependency array includes 'id' to ensure correct project is fetched

  // Fetch available skills for the select dropdown
  const fetchSkills = async () => {
    try {
      const response = await axios.get("https://portfolio-backend-5cf0.onrender.com/skillName");
      setSkillName(response.data.skillNames);
    } catch (error) {
      console.error("Error fetching skill names:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchProjectData();
  }, [fetchProjectData]); // Properly include fetchProjectData as a dependency


  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Edit Project</h1>
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

        {/* Display Current Image */}
        <div className="mb-3">
          <label className="form-label">Current Image</label>
          {currentImage && (
            <div>
              <img
                src={currentImage} // Make sure the image path matches your backend
                alt="current project"
                style={{ maxWidth: "200px", marginBottom: "10px" }}
              />
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="input-group mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
            accept=".png, .jpg, .jpeg, .svg"
          />
          <label className="input-group-text">Upload New Image (Optional)</label>
        </div>

        {/* Technology Select */}
        <div className="mb-3">
          <label className="form-label">Select Technology</label>
          <Select
            value={selectedOption}
            isMulti={true}
            isSearchable={true}
            onChange={handleSelectChange}
            options={skillName}
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

export default EditProject;
