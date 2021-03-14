'use strict'
//毕业要求指标点
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PointSchema = new Schema({
    content: { type: String },
    course: [//课程这里因为是一个指标点对应多个课程
      {
        courseName: { type: String },
        weight: { type: Number, defineValue: 0 },
      }
    ],
    graduationRequirement: {//关联毕业要求
      type: Schema.Types.ObjectId,
      ref: 'GraduationRequirement'
    },
    teachingGoal: [{//对应课程目标
      type: Schema.Types.ObjectId,
      ref: 'TeachingGoal'
    }]
  })

  return mongoose.model('Point', PointSchema, 'point');
}