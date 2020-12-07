'use strict'
//年级表
module.exports = app => {
  const mongoose = app.mongoose;
  const GradeSchema = new mongoose.Schema({
    id: {type:Schema.Types.ObjectId,required: true},
    name: { type: String },
    studentNumber:{type:Number},//年级人数，和专业表的人数相关联,干脆到时候直接相加
  })

  GradeSchema.virtual('schoolyearRequirement', {
    localField: '_id',
    foreignField: 'schoolyear',
    justOne: false,
    ref: 'SchoolRequirement'
  })

  return mongoose.model('Grade', GradeSchema, 'grade');
}