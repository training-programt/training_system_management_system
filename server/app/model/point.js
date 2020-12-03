'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PointSchema = new Schema({
    content: {type: String},
    course_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    graduationRequirement_id: {
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    }
  })

  return mongoose.model('Point', PointSchema, 'point');
}