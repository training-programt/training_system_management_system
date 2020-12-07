'use strict'
//课程考核表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AssessmentSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    name:{type:String},
    course:{//课程
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    teaching_goal:[{
        type:Schema.Types.ObjectId,
        ref:'TeachingGoal'
    }],//课程目标(包括了考核方式和占比AttendanceProportion)
    test:{type:Boolean},//考核方式，考试、考查
    check:{type:Boolean},
    assessment_process:{type:Number},//成绩构成比例 过程考核占比
    In_class_practice:{type:Number},//课内实践占比
    end_test:{type:Number},//末考占比
    note:{type:String},//备注，老师姓名
    teacher_room_opinion:{type:String},//教研室意见
    sub_committees_Opinions:{type:String}//课程考核工作指导分委会意见
  })
  
  return mongoose.model('Assessment', AssessmentSchema, 'assessment');
}