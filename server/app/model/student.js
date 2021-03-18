'use strict'
//学生人数管理表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const StudentSchema = new Schema({
    grade: {
        type: Schema.Types.ObjectId,
        ref: 'Grade',
     },
    major: {
      type: Schema.Types.ObjectId,
      ref: 'Major',
    },
    class:{type:String},//1-5
   number:{type:Number},//学生人数
  })

  return mongoose.model('Student', StudentSchema, 'student');
}