'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TheorySchema = new Schema({
    unit: { type: String },
    content: { type: String },
    requirements: { type: String },
    within: { type: String },
    way: { type: String }
  })

  return mongoose.model('Theory', TheorySchema, 'theory');
}