//学分结构表
'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CreditStructureSchema = new Schema({
    total_credits: { type: Number },
    description: { type: String },
    content: [{
      credit: { type: Number },//学分
      courseType: { //课程类型
        type: Schema.Types.ObjectId,
        ref: 'CourseType'
      },
      ratio: { type: Number },//所占比例
    }]

  })

  return mongoose.model('CreditStructure', CreditStructureSchema, 'creditStructure');
}