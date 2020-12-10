'use strict'
//教学大纲表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SyllabusSchema = new Schema({
    course_info:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    },//课程基本信息,怎么联系和课程联系？
    teaching_goal:[{
        type:Schema.Types.ObjectId,
        ref:'TeachingGoal'
    }],//教学目标
    theory_teaching:[{
      type:Schema.Types.ObjectId,
        ref:'TheoryTeach'
    }],//理论教学
    practice_teaching:[{
      type:Schema.Types.ObjectId,
        ref:'PracticeTeach'
    }],//实践教学
    assessment:{type:String},//考核方式
    reference:{type:String},//建意教材及教学参考书
    instructions:{type:String},//大纲执行说明
    writer:{type:String},//执笔人
    reviewer:{type:String},//审核人
    modify_data:{type:Date},//修改时间
  })
  
  return mongoose.model('Syllabus', SyllabusSchema, 'syllabus');
}