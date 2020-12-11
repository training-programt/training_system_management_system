'use strict'
//课程目标考核方式及占比(％)（未考核项目填“/”）表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AttendanceProportionSchema = new Schema({
    attendance:{type:Number},//考勤
    answer_question:{type:Number},//回答问题
    work_ordinary:{type:Number},//平时作业
    lab_report:{type:Number},//实验报告
    online_learning:{type:Number},//在线学习
    paper:{type:Number},//论文
    end_test:{type:Number},//末考
    other:[{
        hybrid:{type:Number},//混合式教学
    }],
    
  })
  
  return mongoose.model('AttendanceProportion', AttendanceProportionSchema, 'attendanceProportion');
}