'use strict'
//教学大纲表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SyllabusSchema = new Schema({
    course_info: {
      type: Schema.Types.ObjectId,
      ref: 'DetailCourse'
    },
    teaching_goal: [{
      type: Schema.Types.ObjectId,
      ref: 'TeachingGoal'
    }],//教学目标
    relation:[{
      type: Schema.Types.ObjectId,
      ref: 'Relation'
    }],//课程教学目标与毕业要求的对应关系
    theory_teaching: [{
      type: Schema.Types.ObjectId,
      ref: 'TheoryTeach'
    }],//理论教学
    practice_teaching: [{
      type: Schema.Types.ObjectId,
      ref: 'PracticeTeach'
    }],//实践教学
    assessment: [{
      type: Schema.Types.ObjectId,
      ref: 'AttendanceProportion'
    }],//考核环节
    assessmentGoal:[{
      type:Schema.Types.ObjectId,
      ref:"AssessmentGoal"
    }],//考核环节与课程目标的对应关系
    reference: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }],//建意教材及教学参考书
    instructions: { type: String },//大纲执行说明
    writer: { type: String },//执笔人
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },//审核人
    modify_data: { type: Date },//修改时间
    status:{type:Number,default:0},//提交状态
  })

  return mongoose.model('Syllabus', SyllabusSchema, 'syllabus');
}