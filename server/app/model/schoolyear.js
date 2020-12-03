'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const SchoolyearSchema = new mongoose.Schema({
    name: { type: String },
  })

  SchoolyearSchema.virtual('schoolyearRequirement', {
    localField: '_id',
    foreignField: 'schoolyear_id',
    justOne: false,
    ref: 'SchoolRequirement'
  })

  return mongoose.model('Schoolyear', SchoolyearSchema, 'schoolyear');
}