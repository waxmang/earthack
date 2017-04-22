var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    id          : String,
    token       : String,
    email       : String,
    name        : {type: String, unique: false},
    location    : String,
    userType    : String
});

module.exports = mongoose.model('User', UserSchema);
