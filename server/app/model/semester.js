'use strict'
//学期表 2017-2018上学期
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SemesterSchema = new mongoose.Schema({
    semesterName: { type: String },
  })

  return mongoose.model('Semester', SemesterSchema, 'semester');
}