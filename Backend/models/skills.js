import mongoose from "mongoose";

// Define the schema for skills
const skillSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: {
    data: Buffer, // To store image data as binary
    contentType: String, // To store the image MIME type (e.g., 'image/jpeg')
  },
  progress: Number,
});

const Skill = mongoose.model("skill", skillSchema);

export default Skill;
