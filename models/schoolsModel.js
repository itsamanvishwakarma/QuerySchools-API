const mongoose = require("mongoose");

// Define the schema for the schools model

const schoolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aff_no: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const schoolsModel = mongoose.model("AllSchools", schoolsSchema);
module.exports = schoolsModel;
