'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CourseSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    unit: {
      type: Schema.Types.ObjectId,
      ref: 'College'
    },
    header: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    introduce: { type: String },
    type: { type: String }
  })

  return mongoose.model('Course', CourseSchema, 'course');
}