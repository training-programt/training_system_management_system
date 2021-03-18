'use strict'
//学期表 2017-2018-1
module.exports = app => {
  const mongoose = app.mongoose; 
  const Schema = mongoose.Schema;
  const SemesterSchema = new Schema({
    semesterName: { type: String },
  })

  return mongoose.model('Semester', SemesterSchema, 'semester');
}