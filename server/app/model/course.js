'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CourseSchema = new Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String },
    unit_id: {
      type: Schema.Types.ObjectId,
      ref: 'College'
    },
    header_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    introduce: { type: String },
    type: { type: String }
  })

  return mongoose.model('Course', CourseSchema, 'course');
}