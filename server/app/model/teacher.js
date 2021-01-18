'use strict'
//教师表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeacherSchema = new Schema({
    name: { type: String },
    role: [{
      type: Schema.Types.ObjectId,
      ref: 'Role',
    }],
    password:{type:String},
    sex:{type:String},
    birthday:{type:String},
    //课程，教师课程一对多
    course:[{type:Schema.Types.ObjectId,ref:'Course'}],
    job:{type:String},//专职，兼职
    position: {//副教授、助教.....
      type: String,
    },
    lastInfo:{type:String},//最后学历
    graduateSchool:{type:String},//毕业院校
    researchDirection:{type:String},//研究领域
    professional:{type:String},//最后的专业
    degree:{typr:String},//最后学历毕业学位
    teachRoom: {//所属教研室
      type: Schema.Types.ObjectId,
      ref: 'TeachRoom'
    },
    major: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    }
  })

  return mongoose.model('Teacher', TeacherSchema, 'teacher');
}