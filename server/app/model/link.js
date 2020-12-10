'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const LinkSchema = new Schema({
    name: { type: String },
    proportion: { type: String }
  })

  return mongoose.model('Link', LinkSchema, 'link');
}