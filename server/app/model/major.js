'use strict'
// 专业表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorSchema = new Schema({
    name: { type: String },
    code: { type: String },
    introduce: { type: String },
    count: { 
      type: Number,
    },

    college: {
      type: Schema.Types.ObjectId,
      ref: 'College'
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: 'Grade'
    },
    //学期表相关联
    semester:{
      type:Schema.Types.ObjectId,
      ref:'Semester'
    },
  teachers:[{type:Schema.Types.ObjectId,ref:'teacher'}],
  })
  MajorSchema.virtual('teachRoom', {
    localField: '_id',//内键,schema对应的模型Major的_id
    foreignField: 'major',//外键,关联模型teachRoom的major_id字段
    justOne: false,// 只查询一条数据
    ref: 'TeachRoom'//关联的模型
  })

  MajorSchema.virtual('trainingProject', {
    localField: '_id',
    foreignField: 'major_id',
    justOne: false,
    ref: 'TrainingProject'
  })

  return mongoose.model('Major', MajorSchema, 'major');
}