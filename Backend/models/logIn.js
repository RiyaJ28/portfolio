import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const yourSchema = new Schema({
  UserName: String,
  Password: String,
});

// Create a model from the schema
const LogIn = mongoose.model('users', yourSchema);

// Export the model using ES6 export syntax
export default LogIn;