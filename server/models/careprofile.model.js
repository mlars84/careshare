var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Mongoose Schema
var CareProfileSchema = new Schema({
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: String, required: true},
    basicInfo: {type: String, required: true},
    careInfo: {type: String, required: true},
    userCreated: {type: String, required: true},
    sharedWith: {type: Array, required: false}
});

module.exports = mongoose.model('careprofiles', CareProfileSchema);
