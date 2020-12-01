'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CollegeSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String },
    introduce: { type: String },
  })

  CollegeSchema.virtual('majorList', {
    localField: '_id',
    foreignField: 'college',
    justOne: false,
    ref: 'Major'
  })

  CollegeSchema.virtual('teachRoomList', {
    localField: '_id',
    foreignField: 'college',
    justOne: false,
    ref: 'TeachRoom'
  })

  CollegeSchema.virtual('courseList', {
    localField: '_id',
    foreignField: 'college',
    justOne: false,
    ref: 'Course'
  })

  return mongoose.model('College', CollegeSchema, 'college');
}