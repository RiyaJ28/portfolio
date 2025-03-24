import mongoose from "mongoose";

// Define the schema for experiences
const experienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  responsibilities: { type: String, required: true },
});

const Experience = mongoose.model("experience", experienceSchema);

export default Experience;
