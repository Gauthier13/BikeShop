var mongoose = require('mongoose');

var articlesSchema = mongoose.Schema({
    name: String,
    url: String,
    price: Number,
    mea: Boolean,
    modeLiv: [Number],
    stock: Number,
    stockInBasket: Number
});

module.exports = mongoose.model('Bikes', articlesSchema);