'use strict'
//课程表 元信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BasicCourseSchema = new Schema({
    name: { type: String },
    code: { type: String },//课程代码
    credits: { type: String },//学分
    within: { type: Number },//理论
    outside: { type: Number },//实践
    computer: { type: Number },//课外
    all: { type: Number },//总学时
  })
  return mongoose.model('BasicCourse', BasicCourseSchema, 'basicCourse');
}
