'use strict'
//考核环节表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AttendanceProportionSchema = new Schema({
    name:{type:String},
    content:{type:String},
    account:{type:String},//占比10%
    // status:{type:Boolean},
  })
  
  return mongoose.model('AttendanceProportion', AttendanceProportionSchema, 'attendanceProportion');
}