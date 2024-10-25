import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LogIn() {
 
  const history = useNavigate();
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });

  
  const [alert, setAlert] = useState(<div className="text-center"></div>);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.UserName !== "" && formData.Password !== "") {
      setAlert(<div className="text-center"></div>);
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          formData
        )
        .then(res => {
          if(res.data === true){
            history("/dashboard" , {state:{state:true , page:"main"}});
          }
          else if(res.data === false){
            setAlert(
              <div className="text-center">Incorrect Password or UserName</div>
            );
          }
        })
        console.log(response.data);
        setFormData({ UserName: "", Password: "" });
        // Handle success (optional)
        
      } catch (error) {
        console.error("Error:", error);
        // Handle error (optional)
        setFormData({ UserName: "", Password: "" });
        setAlert(
          <div className="text-center">Server is not Working</div>
        );
      }
    } else {
      setAlert(
        <div className="text-center">Incorrect Password or UserName</div>
      );
    }
  };
  
  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="loginForm">
        {alert}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="text"
            name="UserName"
            onChange={handleChange}
            value={formData.UserName}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="Password"
            onChange={handleChange}
            value={formData.Password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;
