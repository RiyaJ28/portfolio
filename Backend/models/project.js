import mongoose from "mongoose";

// Define the schema for skills
const skillSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: {
    data: Buffer, // To store image data as binary
    contentType: String, // To store the image MIME type (e.g., 'image/jpeg')
  },
  technology: String,
  webLink: String,
});

const Project = mongoose.model("project", skillSchema);

export default Project;