'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PracticeSchema = new Schema({
    name: { type: String },
    objective: { type: String },
    content: { type: String },
    way: { type: String }
  })

  return mongoose.model('Practice', PracticeSchema, 'practice');
}