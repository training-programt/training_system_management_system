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
    achievement: [{
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
    }],
    //课程培养目标说明
    description: { type:String},
    teachRoomOpinion: {//教研室意见
      content: { type: String },
      createtime: { type: Date }
    },
    teachRoomState:{type:Number,default:0},//0未审核，1已审核
    collegeOpinion: {//学院意见
      content: { type: String },
      createtime: { type: Date }
    },
    collegeState:{type:Number,default:0},//0未审核，1已审核
    isAchievement:{type:Number,default:0},//是否达成 0未达成 1已达成
  })

  return mongoose.model('Audit', AuditSchema, 'audit');
}