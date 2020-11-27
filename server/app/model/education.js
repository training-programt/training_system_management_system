'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const EducationSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: Number },
  })

  EducationSchema.virtual('teacherList', {
    localField: '_id',
    foreignField: 'education',
    justOne: false,
    ref: 'Teacher'
  })

  EducationSchema.virtual('teacherList', {
    localField: '_id',
    foreignField: 'position',
    justOne: false,
    ref: 'Teacher'
  })

  return mongoose.model('Education', EducationSchema, 'education');
}