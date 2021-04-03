'use strict'
//评价标准
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const StandardSchema = new Schema({
    teaching_goal:{type: String,},
    major_requirement: {type:String},
    assessment:{type:String},
    status:{type:String},//√、×
    optimal:{type:String},//优
    fine:{type:String},//良
    middle:{type:String},//中
    fail:{type:String},//不及格

  })

  return mongoose.model('Standard', StandardSchema, 'standard');
}