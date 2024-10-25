import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const yourSchema = new Schema({
  firstName: String,
  lastName: String,
  description: String,
  primaryId : Number
});

// Create a model from the schema
const Intro = mongoose.model('introduction', yourSchema);

// Export the model using ES6 export syntax
export default Intro;
