'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeacherSchema = new Schema({
    code: { type: String, unique: true },
    name: { type: String },
    role: { type: Number, default: 1 },
    position_id: {
      type: Schema.Types.ObjectId,
      ref: 'Education'
    },
    education_id: {
      type: Schema.Types.ObjectId,
      ref: 'Education'
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    teachRoom_id: {
      type: Schema.Types.ObjectId,
      ref: 'TeachRoom'
    },
    major_id: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    }
  })

  return mongoose.model('Teacher', TeacherSchema, 'teacher');
}