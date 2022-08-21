// Import Mongoose to use schema
const mongoose = require("mongoose");

// Create Schema
const apptSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    docName: {type: String, required:true},
    time: {type: String, required: true},
    date: {type: String, required: true, },
    reason: {type: String, required: true}, 
    firstAppt:{type: Boolean, required: true}
  },
  {timestamp:true}
  )
  
  // CREATE MODEL for Appointment
//      					 collection  schema
const Appt = mongoose.model('Appointment', apptSchema);

module.exports = Appt;
//   const userSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: true},
//     password: String
//   })