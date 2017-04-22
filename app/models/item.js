var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema ({
    amount: String,
    food_name: String,
    description: String,
    allergens: [String]
});

module.exports = mongoose.model('Item', ItemSchema);