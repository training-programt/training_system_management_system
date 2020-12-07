'use strict'
//学期表
module.exports = app => {
  const mongoose = app.mongoose;
  const SemesterSchema = new mongoose.Schema({
    id: {type:Schema.Types.ObjectId,required: true},
    name: { type: String },
  })

  return mongoose.model('Semester', SemesterSchema, 'semester');
}