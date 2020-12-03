'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SyllabusSchema = new Schema({
    name: { type: String },
    introduce: {type: String},
    writer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    reviewer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    assessment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Assessment'
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    target_id: {
      type: Schema.Types.ObjectId,
      ref: 'CourseTarget'
    },
    practice_id: {
      type: Schema.Types.ObjectId,
      ref: 'Practice'
    },
    theory_id: {
      type: Schema.Types.ObjectId,
      ref: 'Theory'
    }
  })

  return mongoose.model('Syllabus', SyllabusSchema, 'syllabus');
}