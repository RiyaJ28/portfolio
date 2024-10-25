import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function ViewEmails() {
  const [sata, setData] = useState([]);
  const fetchData = async () => {
    try {
      // Make a GET request to your backend endpoint
      const response = await axios.get("http://localhost:5000/viewEmails"); // Adjust the endpoint accordingly
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
      const response = await axios.post("http://localhost:5000/deleteEmails", { id });
      console.log(response.data);
      if (response.data.success === true) {
        alert("Message deleted successfully");
      }
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
      <h1>All Emails</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">message</th>
            <th scope="col">Reply/Delete</th>
          </tr>
        </thead>
        <tbody>
          {sata.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.message}</td>
              <td>
                <a href={`mailto:${data.email}`}>
                  <ReplyIcon />
                </a>
                /
                <span onClick={() => delete1(data._id)}>
                  <DeleteIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmails;
