'use strict'
//课程类别 数学与自然科学
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CourseTypeSchema = new Schema({
    name: { type: String },
  })
  return mongoose.model('CourseType', CourseTypeSchema, 'courseType');
}