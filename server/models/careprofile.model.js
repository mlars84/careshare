const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const CareProfileSchema = new Schema({
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: String, required: false},
    basicInfo: {type: String, required: false},
    careInfo: {type: String, required: false},
    emergencyContacts: {type: String, required: false},
    userCreated: {type: String, required: true},
    sharedWith: {type: Array, required: false}
});

module.exports = mongoose.model('careprofiles', CareProfileSchema);
