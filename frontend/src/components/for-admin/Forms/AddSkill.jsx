import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSkill() {
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    progress: "",
  });
  const [image, setImage] = useState(null);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("progress", data.progress);
    formData.append("image", image);
    //console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/addSkills",
        formData , {headers: {
          'Content-Type': 'multipart/form-data'
        }}
      );
      console.log(response.data);
      setData({ name: "", image: "", description: "", progress: "" });
    setImage("null");
    if(response.status === 201){
      alert("Project updated successfully");
      history("/dashboard" , {state:{state:true , page:"View Skills"}});
    }
      //setFormData({ name: "", email: "", message: "" });
      // Handle success (optional)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (optional)
    }
    setData({ name: "", image: "", description: "", progress: "" });
    setImage("null");
  };

  return (
    <div className="col-md-9 col-sm-12 p-5">
      <h1>Add Skill</h1>
      <form onSubmit={handleSubmit}  >
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
        <div class="input-group mb-3">
          <input
            type="file"
            name="image"
            class="form-control"
            id="inputGroupFile02"
            onChange={handleImageChange}
            accept=".png , .jpg , .jpeg , .svg"
          />
          <label class="input-group-text" for="inputGroupFile02">
            Upload
          </label>
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

export default AddSkill;
