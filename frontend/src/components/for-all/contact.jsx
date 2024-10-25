import React, { useState } from "react";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [data, setData] = useState({
    email: "",
    instagram: "",
    linkedIn: "",
    gitHub: "",
  });

  const [alert, setAlert] = useState(<div className="text-center"></div>);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.message !== ""
    ) {
      setAlert(<div className="text-center"></div>);
      try {
        const response = await axios.post(
          "http://localhost:5000/sendMessage",
          formData
        );
        console.log(response.data);
        setFormData({ name: "", email: "", message: "" });
        // Handle success (optional)
      } catch (error) {
        console.error("Error:", error);
        // Handle error (optional)
      }
    } else {
      setAlert(<div className="text-center">Fill all the information</div>);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get(
          "http://localhost:5000/editSocialData"
        ); // Adjust the endpoint accordingly
        //            //console.log(response.data);
        setData({
          email: response.data.email,
          instagram: response.data.instagram,
          gitHub: response.data.gitHub,
          linkedIn: response.data.linkedIn,
        });
        //setData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <div className="contact container" id="contact">
      <h1 className="text-center pt-5 pb-1">Want to Get in Touch?</h1>
      <h1 className="text-center pb-1">Drop me a line...</h1>
      <p className="text-center pb-3">251riyajain@gmail.com</p>
      {alert}
      <div className="contactMeForm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="Name" className="form-label">
              Name *
            </label>
            <input
              name="name"
              value={formData.name}
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="Email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label ">
              Message
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="message"
              value={formData.message}
              onChange={handleChange}
            >
              {formData.message}
            </textarea>
          </div>
          <button type="submit" class="btn-color">
            Submit
          </button>
        </form>
      </div>
      <div className="Socials text-center pb-5">
        <a href={`mailto:${data.email}`}>
          <EmailIcon className="social" />
        </a>
        <a href={data.instagram}>
          <InstagramIcon className="social" />
        </a>
        <a href={data.gitHub}>
          <GitHubIcon className="social" />
        </a>
        <a href={data.linkedIn}>
          <LinkedInIcon className="social" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
