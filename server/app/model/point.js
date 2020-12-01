'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PointSchema = new Schema({
    content: {type: String},
    course: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    graducationRequirement: {
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    }
  })

  return mongoose.model('Point', PointSchema, 'point');
}