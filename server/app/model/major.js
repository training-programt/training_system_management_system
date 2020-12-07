'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    code: { type: String },
    introduce: { type: String },
    count: { 
      type: Number,
      // ref:'Grade'
    },

    college: {
      type: Schema.Types.ObjectId,
      ref: 'College'
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
    foreignField: 'major',
    justOne: false,
    ref: 'TrainingProject'
  })

  return mongoose.model('Major', MajorSchema, 'major');
}