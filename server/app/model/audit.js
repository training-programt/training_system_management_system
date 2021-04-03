'use strict'
//审核表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AuditSchema = new Schema({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'CourseSystem',
    },
    achievement: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
    },
    //评价质量标准
    standard: { 
      level:{type:Number},
      details:{type:String}
    },
    teachRoomOpinion: {
      content: { type: String },
      createtime: { type: Date }
    },
    collegeOpinion: {
      content: { type: String },
      createtime: { type: Date }
    },

  })

  return mongoose.model('Audit', AuditSchema, 'audit');
}