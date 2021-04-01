'use strict'
//年级表 2017 2018
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GradeSchema = new Schema({
    name: { type: String },
  })
  return mongoose.model('Grade', GradeSchema, 'grade');
}