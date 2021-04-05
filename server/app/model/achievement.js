'use strict'
//定量达成情况
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AchievementSchema = new Schema({
    teaching_goal:{type: String,},
    major_requirement: {type:String},
    assessment:{type:String},
    status:{type:String},//√、×
    averageScore:{type:String},//平均得分
    targetScore:{type:String},//目标分值
    weightCoefficient:{type:String},//权重系数
    achieveResult:{type:String},//达成结果
  })

  return mongoose.model('Achievement', AchievementSchema, 'achievement');
}