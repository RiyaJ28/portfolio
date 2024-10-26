import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewProjects() {

  const history = useNavigate();
  function handleClick(item , id) {
    //console.log("clicked");
    console.log(item);
    history("/dashboard" , {state:{state:true , page:item , id:id}});
  }

  const [sata, setData] = useState([]);
  const fetchData = async () => {
    try {
      // Make a GET request to your backend endpoint
      const response = await axios.get("https://portfolio-backend-5cf0.onrender.com/viewProjects"); // Adjust the endpoint accordingly
      console.log(response.data);
      setData(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }


  async function delete1(id) {
    try {
      const response = await axios.post("https://portfolio-backend-5cf0.onrender.com/deleteProjects", { id });
      console.log(response.data);
      refreshPage();
      // Handle success (optional)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (optional)
    }
  }
  
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
    //console.log(sata);
  }, []);
  return (
      <div className="col-md-9 col-sm-12 p-5">
        <h1>All Projects</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Technology</th>
              <th scope="col">Image</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
          {sata.map((data, index) => (
            <tr>
              <th scope="row">{index+1}</th>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.technology}</td>
              <td><img style={{ width: 100, height: 100 }} src={data.image} alt=""></img></td>
              <td><span onClick={() => handleClick("Edit Project"  , data.id)}><EditIcon /></span>/<span onClick={() => delete1(data.id)}>
                  <DeleteIcon />
                </span></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }

export default ViewProjects