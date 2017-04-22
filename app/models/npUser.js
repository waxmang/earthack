var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var npUserSchema = new Schema ({
    id : String,
    token : String,
    email : String,
    name: {type: String, unique: false},
    location: String
});

module.exports = mongoose.model('npUser',npUserSchema)