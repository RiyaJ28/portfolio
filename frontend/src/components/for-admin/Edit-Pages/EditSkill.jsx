
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditSkill(props) {
  const history = useNavigate();
  const id = props.id;

  const [data, setData] = useState({
    name: "",
    description: "",
    progress: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.description || !data.progress) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id); // Append id
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("progress", data.progress);
    if (image) {
      formData.append("image", image); // Append image if changed
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/editSkills",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data === "successfull") {
        alert("Skill updated successfully");
        history("/dashboard", { state: { state: true, page: "View Skills" } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/viewSkillEdit",
          { params: { id } }
        );
        setData(response.data);
        setImage(response.data.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Edit Skill</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="exampleInputEmail1"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Description
          </label>
          <textarea
            onChange={handleChange}
            name="description"
            value={data.description}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <img style={{ width: 100, height: 100 }} src={image} alt="Skill" />
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Change Image
          </label>
          <input
            type="file"
            class="form-control"
            onChange={handleImageChange}
            accept=".png , .jpg , .jpeg , .svg"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Progress
          </label>
          <input
            type="number"
            class="form-control"
            name="progress"
            value={data.progress}
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

export default EditSkill;
