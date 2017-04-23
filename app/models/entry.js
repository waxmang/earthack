var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema ({
    restaurant_id : String,
    food_item : String,
    status : String,
    amount: String
});

module.exports = mongoose.model('Entry',EntrySchema);
