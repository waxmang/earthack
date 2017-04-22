var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rUserSchema = new Schema ({
    id         : String,
    token   : String,
    email   : String,
    name    : {type: String, unique: false},
    location: String

});

module.exports = mongoose.model('rUser', rUserSchema);