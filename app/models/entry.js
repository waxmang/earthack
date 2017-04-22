var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema ({
    restaurant_id : String,
    food_category : String,
    food_items : [{type: Schema.Types.ObjectId, ref : 'Item'}],
    status : String
});

module.exports = mongoose.model('Entry',EntrySchema);
