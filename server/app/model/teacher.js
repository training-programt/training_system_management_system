'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeacherSchema = new Schema({
    id: { type: String, unique: true },
    name: { type: String },
    role: { type: Number, default: 1 },
    position: {
      type: Schema.Types.ObjectId,
      ref: 'Education'
    },
    education: {
      type: Schema.Types.ObjectId,
      ref: 'Education'
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    teachRoom: {
      type: Schema.Types.ObjectId,
      ref: 'TeachRoom'
    },
    major: {
      type: String,
      ref: 'Major'
    }
  })

  return mongoose.model('Teacher', TeacherSchema, 'teacher');
}