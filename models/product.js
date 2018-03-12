const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      index:true,
      required: true
    },
    sellers: {
      type: Array
    },
    market_price: Number,
    description: {
      type: String
    }
});

productSchema.index({ title: 'text' });
module.exports = mongoose.model('Product', productSchema);
