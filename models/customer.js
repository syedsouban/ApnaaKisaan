const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const customerSchema = new mongoose.Schema({
    firstName:  {
      type: String,
      required: true
    },
    lastName:  {
      type: String,
      required: true
    },
    gender:  {
      type: String,
      required: true
    },
    created_at: Date,
    phoneNumber: {
      type: Number,
      required: true
    },
    // feed: Array,
    // new_feed: Boolean,
});
customerSchema.pre('save', function(next){
  this.created_at = Date.now();
  next();
})

module.exports = mongoose.model('Customer', customerSchema);
