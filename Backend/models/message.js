import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const yourSchema = new Schema({
  name: String,
  email: String,
  message: String
});

// Create a model from the schema
const Message = mongoose.model('message', yourSchema);

// Export the model using ES6 export syntax
export default Message;