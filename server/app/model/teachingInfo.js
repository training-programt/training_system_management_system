'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachingInfoSchema = new Schema({
    semester: {
      type:Schema.Types.ObjectId,
      ref:'Semester',
    },
    grade: {
      type:Schema.Types.ObjectId,
      ref:'Grade',
    },
    major: {
      type:Schema.Types.ObjectId,
      ref:'Major'
    },
    class: { type: String},
    teacher: {
      type:Schema.Types.ObjectId,
      ref:'Teacher'
    },
    course: {
      type:Schema.Types.ObjectId,
      ref:'CourseSystem'
    }
  })

  return mongoose.model('TeachingInfo', TeachingInfoSchema, 'teachingInfo');
}