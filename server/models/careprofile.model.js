var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var CareProfileSchema = new Schema({
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    basicInfo: {type: String, required: true},
    careInfo: {type: String, required: true},
    user: {type: String, require: true}
});

module.exports = mongoose.model('careprofiles', CareProfileSchema);
