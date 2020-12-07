'use strict'
//毕业要求指标点
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PointSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    content: {type: String},
    course: [//课程这里因为是一个指标点对应多个课程，可是直接ref会全部课程相连？
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    graducationRequirement: {//关联毕业要求指标点
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    }
  })

  return mongoose.model('Point', PointSchema, 'point');
}