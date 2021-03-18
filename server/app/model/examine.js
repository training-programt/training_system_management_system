'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ExamineSchema = new Schema({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    achievement: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
    },
    reach: { type: Number },
    explain: { type: String },
    opinion: {
      content: { type: String },
      createtime: { type: Date }
    },
    collegeOpinion: {
      content: { type: String },
      createtime: { type: Date }
    },

  })

  return mongoose.model('Examine', ExamineSchema, 'examine');
}