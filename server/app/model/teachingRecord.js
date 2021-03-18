'use strict'
// 教师授课记录表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachingRecordSchema = new Schema({
    teacher: {
      type:Schema.Types.ObjectId,
      ref:'Teacher'
    },
    semester: {
      type:Schema.Types.ObjectId,
      ref:'Semester'
    },
    course: {
      type:Schema.Types.ObjectId,
      ref:'BasicCourse'
    },
    assessment: {
      type:Schema.Types.ObjectId,
      ref:'Assessment'
    },
    syllabus: {
      type:Schema.Types.ObjectId,
      ref:'Syllabus'
    },
    createdTime: {
      type: Date,
    }
  })

  return mongoose.model('TeachingRecord', TeachingRecordSchema, 'teachingRecord');
}