'use strict'
//毕业要求指标点
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PointSchema = new Schema({
    content: { type: String },
    weight: { type: Number },
    course: [//课程这里因为是一个指标点对应多个课程
      {
        name: { type: String },
        weight: { type: Number, defineValue: 0 },
      }
    ],
  })

  return mongoose.model('Point', PointSchema, 'point');
}