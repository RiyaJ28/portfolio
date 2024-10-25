import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const yourSchema = new Schema({
  aboutMe: String,
  primaryId : Number
});

// Create a model from the schema
const AboutMe = mongoose.model('aboutMe', yourSchema);

// Export the model using ES6 export syntax
export default AboutMe;