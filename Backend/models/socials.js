import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const yourSchema = new Schema({
  email:String,
  instagram:String,
  gitHub:String,
  linkedIn:String
});

// Create a model from the schema
const Socials = mongoose.model('socials', yourSchema);

// Export the model using ES6 export syntax
export default Socials;