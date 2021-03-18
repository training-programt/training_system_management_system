'use strict'
//课程表 元信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BasicCourseSchema = new Schema({
    name: { type: String },
    code: { type: String },//课程代码
    // type: { type: String },
    //课程负责人与教师相关联
    // header: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Teacher'
    // },
    credits: { type: String },//学分
    // course_ap: { type: String },//先修课程
    
    // semester: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Semester'
    // },//开课学期
    // weekly_hours: { type: Number },
    within: { type: Number },//理论
    outside: { type: Number },//实践
    computer: { type: Number },//课外
    all: { type: Number },//总学时
    // system: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'CourseSystem'
    // },//课程体系
    // nature: { type: String },//课程性质
    // attribute: { type: String },//选修必修限选
    // category: { type: String },//理论课 实验课
    // degree: { type: Boolean },//是否学位课
    // direction: { type: String },//所属方向
    // course_selection_group: { type: String },//分配选课组
    // assessment_method: { type: String },//考核方式
    // flag_fuse: { type: Boolean },//是否产教融合课程
    // point: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Point'
    // },
    // weight: { type: Number },//课程权重 
    // syllabus: {//教学大纲
    //   type: Schema.Types.ObjectId,
    //   ref: 'Syllabus'
    // },
    // assessment: {//课程考核表
    //   type: Schema.Types.ObjectId,
    //   ref: 'Assessment'
    // }
  })
  return mongoose.model('BasicCourse', BasicCourseSchema, 'basicCourse');
}