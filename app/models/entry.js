var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema ({
    restaurant_id : {type: Schema.Types.ObjectId, ref: 'rUser'},
    food_category : String,
    food_items : [{type: Schema.Types.ObjectId, ref : 'Item'}]
});

module.exports = mongoose.model('Entry',EntrySchema);