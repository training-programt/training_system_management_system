'use strict'
//用户表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    password:{type:String},
    role:{type:Number},//1是授课教师，2课程负责人，3教研室主任，4教学领导
  })
  return mongoose.model('User', UserSchema, 'user');
}