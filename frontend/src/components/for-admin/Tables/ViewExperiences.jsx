import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ViewExperiences() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);

  // Fetch experiences from backend
  const fetchData = async () => {
    try {
      const response = await axios.get("https://portfolio-backend-5cf0.onrender.com/viewExperiences");
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh page after delete
  function refreshPage() {
    window.location.reload(false);
  }

  // Delete experience
  async function deleteExperience(id) {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;

    try {
      await axios.delete(`"https://portfolio-backend-5cf0.onrender.com/deleteExperience/${id}`);
      alert("Experience deleted successfully!");
      refreshPage();
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience.");
    }
  }

  // Navigate to edit page
  function handleEdit(exp) {
    navigate("/dashboard", { state: { state: true, page: "Edit Experience", experience: exp } });
  }

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>All Experiences</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company</th>
            <th scope="col">Position</th>
            <th scope="col">Duration</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp, index) => (
            <tr key={exp._id}>
              <th scope="row">{index + 1}</th>
              <td>{exp.companyName}</td>
              <td>{exp.position}</td>
              <td>{exp.start} - {exp.end}</td>
              <td>
                <span onClick={() => handleEdit(exp)}><EditIcon /></span> /
                <span onClick={() => deleteExperience(exp._id)}><DeleteIcon /></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewExperiences;
