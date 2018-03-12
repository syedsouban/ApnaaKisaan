const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const personalProductSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      index:true,
      required: true
    },
    seller_id: Number,
    buyer_id: Number,
    urgency: Boolean,
    description: {
      type: String
    },
    interested_buyers: Array,
    amount: String,
    quantity: Number,
    image: {
      type: String,
      required: true
    },
    created_at: Date,
    duration: Date
});

personalProductSchema.pre('save', function(next){
  this.created_at = Date.now();
  next();
})
personalProductSchema.index({ title: 'text' });
module.exports = mongoose.model('PersonalProduct', personalProductSchema);
