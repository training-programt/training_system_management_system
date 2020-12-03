'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CourseTargetSchema = new Schema({
    description: { type: String },
  })

  return mongoose.model('CourseTarget', CourseTargetSchema, 'courseTarget');
}