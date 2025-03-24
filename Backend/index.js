import express from "express";
import cors from "cors";
import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";
import dotenv from "dotenv";
//import userRouter from "./user.js";

/* ----Models----- */
import LogIn from "./models/logIn.js";
import Intro from "./models/intro.js";
import AboutMe from "./models/about.js";
import Skill from "./models/skills.js";
import Project from "./models/project.js";
import Message from "./models/message.js";
import Socials from "./models/socials.js";
import Experience from "./models/experience.js";

// Call dotenv.config() to load environment variables from .env file
dotenv.config();

// MongoDB connection string
const uri = process.env.URI;
//number of salt rounds for encryption
const saltRounds = process.env.SALT_ROUNDS;
//Port for local host
const PORT = process.env.PORT;

export const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(uri, {})
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

const ObjectId = mongoose.Types.ObjectId;

// Multer setup for handling file uploads (but without storing the file on disk)
const storage = multer.memoryStorage(); // Memory storage for multer to access the file in memory
const upload = multer({ storage });

/*------for different files for different Routres */
//app.use("/users", userRouter);

/*-------LOGIN-------*/
app.post("/login", async (req, res) => {
  const data = req.body;
  LogIn.findOne({ UserName: data.UserName })
    .then((doc) => {
      if (doc) {
        bcrypt.compare(data.Password, doc.Password, (err, result) => {
          if (err) {
            res.send(false);
          } else {
            if (result) {
              res.send(true);
            }
          }
        });
      } else {
        res.send(false); // Document not found
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.send(false);
    });
});

/* -------Home/Intro------ */
//UPDATION
app.post("/editHome", async (req, res) => {
  try {
    const data = req.body;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const description = data.description;
    const primaryId = process.env.INTRO;
    const updatedIntro = await Intro.findOneAndUpdate(
      { primaryId: primaryId }, // Filter to find the document
      { firstName: firstName, lastName: lastName, description: description } // Fields to update
      //{ new: true } // Return the updated document
    );

    if (!updatedIntro) {
      return res
        .status(404)
        .send({ success: false, message: "Document not found" });
    }

    // If the document is found and updated
    res.send({ success: true, data: updatedIntro });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .send({ success: false, message: "Error updating document" });
  }
});
//Viewing
app.get("/editHomeData", async (req, res) => {
  Intro.findOne({ primaryId: process.env.INTRO })
    .then((result) => {
      if (result) {
        //console.log('Document found:', result);
        res.send(result);
      } else {
        console.log("Document not found");
      }
    })
    .catch((err) => {
      console.error("Error finding document:", err);
    });
});
/*------ABOUT ME--------*/
//Updation
app.post("/editAboutMe", async (req, res) => {
  try {
    const data = req.body;

    const updatedAboutMe = await AboutMe.findOneAndUpdate(
      { primaryId: process.env.INTRO }, // Filter to find the document
      { aboutMe: data.aboutMe } // Fields to update
      //{ new: true } // Return the updated document
    );

    if (!updatedAboutMe) {
      return res
        .status(404)
        .send({ success: false, message: "Document not found" });
    }

    // If the document is found and updated
    res.send({ success: true, data: updatedAboutMe });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .send({ success: false, message: "Error updating document" });
  }
});
//Viewing
app.get("/aboutMeData", async (req, res) => {
  AboutMe.findOne({ primaryId: process.env.INTRO })
    .then((result) => {
      if (result) {
        //console.log('Document found:', result);
        res.send(result);
      } else {
        console.log("Document not found");
      }
    })
    .catch((err) => {
      console.error("Error finding document:", err);
    });
});
/*-----Skills-----  */
//ADDING  SKILLS
app.post("/addSkills", upload.single("image"), async (req, res) => {
  try {
    const { name, description, progress } = req.body;

    // Create a new skill document
    const skill = new Skill({
      name,
      description,
      progress,
      image: {
        data: req.file.buffer, // Store the image file as binary in MongoDB
        contentType: req.file.mimetype, // Store the image's MIME type
      },
    });

    await skill.save(); // Save the skill in the database

    res
      .status(201)
      .json({ success: true, message: "Skill added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add skill" });
  }
});
//VIEWING SKILLS
app.get("/viewSkills", async (req, res) => {
  try {
    // Fetch all skills
    const skills = await Skill.find();
    //console.log(skills);

    if (skills && skills.length > 0) {
      // Map through the skills array and prepare the response
      const skillData = skills.map((skill) => ({
        name: skill.name,
        description: skill.description,
        progress: skill.progress,
        image: `data:${skill.image.contentType
          };base64,${skill.image.data.toString("base64")}`, // Convert binary data to base64
        id: skill._id,
      }));

      res.json(skillData);
    } else {
      res.status(404).json({ success: false, message: "Skill not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get("/viewSkillEdit", async (req, res) => {
  try {
    const id = req.query.id;
    const skill = await Skill.findOne({ _id: id });
    const skillData = {
      name: skill.name,
      description: skill.description,
      progress: skill.progress,
      image: `data:${skill.image.contentType
        };base64,${skill.image.data.toString("base64")}`, // Convert binary data to base64
      id: skill._id,
    };
    res.json(skillData).status(200);
  } catch (err) {
    console.log(err);
  }
});
app.post("/editSkills", upload.single("image"), async (req, res) => {
  try {
    const { id, name, description, progress } = req.body; // Extract data from request body
    let updatedFields = { name, description, progress };

    // Check if the image is uploaded
    if (req.file) {
      updatedFields.image = {
        data: req.file.buffer, // Store the image file as binary in MongoDB
        contentType: req.file.mimetype, // Store the image's MIME type
      };
    }

    // Find the skill by ID and update it with new data
    const skill = await Skill.findByIdAndUpdate(
      id,
      { $set: updatedFields }, // Update the provided fields
      { new: true } // Return the updated document
    );

    if (skill) {
      res.status(200).json("successfull");
    } else {
      res.status(404).json({ success: false, message: "Skill not found" });
    }
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/deleteSkills", async (req, res) => {
  try {
    const { id } = req.query; // Destructure id from req.query

    // Ensure the id is provided and is a valid ObjectId
    if (!id || id.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid skill ID" });
    }

    // Find and delete the skill by id
    const skill = await Skill.findOneAndDelete({ _id: id });

    // Check if the skill was found and deleted
    if (skill) {
      res
        .status(200)
        .json({ success: true, message: "Skill deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Skill not found" });
    }
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/*-----Project-----*/
app.get("/skillName", async (req, res) => {
  try {
    const skills = await Skill.find({}, "name"); // Fetch only names of skills
    const formattedSkills = skills.map((skill) => ({
      value: skill.name,
      label: skill.name,
    }));
    res.status(200).json({ skillNames: formattedSkills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addProject", upload.single("image"), async (req, res) => {
  try {
    const { name, description, technology, webLink } = req.body;

    // Create a new skill document
    const project = new Project({
      name,
      description,
      technology,
      webLink,
      image: {
        data: req.file.buffer, // Store the image file as binary in MongoDB
        contentType: req.file.mimetype, // Store the image's MIME type
      },
    });

    await project.save(); // Save the skill in the database

    res
      .status(201)
      .json({ success: true, message: "Skill added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add skill" });
  }
});
app.get("/viewProjects", async (req, res) => {
  try {
    // Fetch all skills
    const projects = await Project.find();
    //console.log(skills);

    if (projects && projects.length > 0) {
      // Map through the skills array and prepare the response
      const projectData = projects.map((project) => ({
        name: project.name,
        description: project.description,
        webLink: project.webLink,
        image: `data:${project.image.contentType
          };base64,${project.image.data.toString("base64")}`, // Convert binary data to base64
        id: project._id,
        technology: project.technology,
      }));

      res.json(projectData);
    } else {
      res.status(404).json({ success: false, message: "PRoject not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get("/viewProjectEdit", async (req, res) => {
  try {
    const id = req.query.id;
    //console.log(id);
    const project = await Project.findOne({ _id: id });
    // Check if the project exists
    if (!project) {
      console.log("NotFound");
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    const projectData = {
      name: project.name,
      description: project.description,
      webLink: project.webLink,
      image: project.image
        ? `data:${project.image.contentType
        };base64,${project.image.data.toString("base64")}`
        : null, // Convert binary data to base64 if the image exists
      id: project._id,
    };
    res.json(projectData).status(200);
  } catch (err) {
    console.log(err);
  }
});
app.post("/editProject", upload.single("image"), async (req, res) => {
  try {
    const { id, name, description, webLink, technology } = req.body; // `technology` is now an array
    let updatedFields = { name, description, webLink, technology }; // No need to parse `technology`

    // Check if the image is uploaded
    if (req.file) {
      updatedFields.image = {
        data: req.file.buffer, // Store the image file as binary in MongoDB
        contentType: req.file.mimetype, // Store the image's MIME type
      };
    }

    // Find the project by ID and update it with new data
    const project = await Project.findByIdAndUpdate(
      id,
      { $set: updatedFields }, // Update the provided fields
      { new: true } // Return the updated document
    );

    if (project) {
      res.status(200).json({ success: true});
    } else {
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/deleteProject", async (req, res) => {
  try {
    const { id } = req.query; // Destructure id from req.query

    // Ensure the id is provided and is a valid ObjectId
    if (!id || id.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID" });
    }

    // Find and delete the project by id
    const project = await Project.findOneAndDelete({ _id: id });

    // Check if the project was found and deleted
    if (project) {
      res
        .status(200)
        .json({ success: true, message: "Project deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


/* ------Messages-----*/
app.post("/sendMessage", async (req, res) => {
  // Handle incoming data here
  try {
    const newData = new Message(req.body); // Assuming req.body contains the form data
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: "Error saving data", error });
  }

  //res.send("Data received successfully");
});
/*view MEssages*/
app.get("/viewEmails", async (req, res) => {
  Message.find()
    .then((result) => {
      if (result) {
        //console.log(result);
        res.send(result);
      } else {
        console.log("Document not found");
      }
    })
    .catch((err) => {
      console.error("Error finding document:", err);
    });
});
/*DeleteMessages*/
app.post("/deleteEmails", async (req, res) => {
  const data = req.body;
  //console.log(data);
  const id = data.id;
  //console.log(id);

  Message.deleteOne({ _id: id })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "Project deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Project not found" });
      }
      /*
      if (result) {
        res.send("Successfull");
      } else {
        res.send("Unsuccessfull");
      }
        */
    })
    .catch((err) => {
      console.error("Error finding document:", err);
    });
});


/*-----Socials-----*/
app.post("/editSocials", async (req, res) => {
  const data = req.body;
  const paramsId = process.env.SOCIAL_ID;
  // Update specific fields of the document and return the updated document
  //home.findByIdAndUpdate(paramsId, { firstName: data.firstName , lastName: data.lastName , description : data.description }, { new: true }, (err, result) => {
  try {
    const result = await Socials.findByIdAndUpdate(
      paramsId,
      {
        email: data.email,
        instagram: data.instagram,
        gitHub: data.gitHub,
        linkedIn: data.linkedIn,
      },
      { new: true }
    );
    console.log("Document updated successfully:", result);
  } catch (err) {
    console.error("Error updating document:", err);
  }

  //res.send("got it");
});

app.get("/editSocialData", async (req, res) => {
  const paramsId = process.env.SOCIAL_ID;
  //const exampleId = 'your_document_id'; // Replace 'your_document_id' with the actual ObjectId

  // Convert the string to a valid ObjectId
  const objectId = new ObjectId(paramsId);

  // Find the document by ObjectId
  Socials
    .findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        //console.log('Document found:', result);
        res.send(result);
      } else {
        console.log("Document not found");
      }
    })
    .catch((err) => {
      console.error("Error finding document:", err);
    });
});


/*------Experience------ */
// ✅ Add Experience
app.post("/addExperience", async (req, res) => {
  try {
    const { companyName, position, start, end, responsibilities } = req.body;

    const experience = new Experience({
      companyName,
      position,
      start,
      end,
      responsibilities,
    });

    await experience.save();
    res.status(201).json({ success: true, message: "Experience added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add experience" });
  }
});

// ✅ View All Experiences
app.get("/viewExperiences", async (req, res) => {
  try {
    const experiences = await Experience.find();

    if (experiences.length > 0) {
      res.status(200).json(experiences);
    } else {
      res.status(404).json({ success: false, message: "No experiences found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ View Single Experience (for Editing)
app.get("/viewExperienceEdit", async (req, res) => {
  try {
    const { id } = req.query;
    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    res.status(200).json(experience);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Edit Experience
app.post("/editExperience", async (req, res) => {
  try {
    const { id, companyName, position, start, end, responsibilities } = req.body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { companyName, position, start, end, responsibilities },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    res.status(200).json({ success: true, message: "Experience updated successfully" });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Delete Experience
app.post("/deleteExperience", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id || id.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid experience ID" });
    }

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    res.status(200).json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
