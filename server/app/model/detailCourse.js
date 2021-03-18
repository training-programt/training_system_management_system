'use strict'
//课程负责人 详细课程信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const DetailCourseSchema = new Schema({
      course:{
        type:Schema.Types.ObjectId,
        ref:'BasicCourse'
      },
      englishName: { type: String },//英文名字
      unit: {//所属学院
      type: Schema.Types.ObjectId,
      ref: 'College'
    },
     header: {type:String},
     category:{type:String},//类别
    professional: [{
      type: Schema.Types.ObjectId,
      ref: 'Major'
    }],//适用专业
    course_ap: { type: String },//先修课程
    introduce:{type:String},//课程简介
  })
  return mongoose.model('DetailCourse', DetailCourseSchema, 'detailCourse');
}