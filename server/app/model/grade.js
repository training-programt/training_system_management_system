'use strict'
//年级表 2017 2018
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GradeSchema = new mongoose.Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    studentNumber: [{ 
      type: Schema.Types.ObjectId,
      ref:'Major'
    }],
  })
  return mongoose.model('Grade', GradeSchema, 'grade');
}