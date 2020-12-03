'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AssessmentSchema = new Schema({
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    link_id: {
      type: Schema.Types.ObjectId,
      ref: 'Link'
    },
    way: { type: String },
    teacher: { type: String },
    target: { type: String },
  })

  return mongoose.model('Assessment', AssessmentSchema, 'assessment');
}