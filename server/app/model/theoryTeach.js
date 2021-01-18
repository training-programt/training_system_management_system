'use strict'
//课程理论教学内容及学时分配
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TheoryTeachSchema = new Schema({
    unit:{type:String},//教学单元
    content:{type:String},//教学内容
    requirements:{type:String},//分成的几点，写入数据库成为一段话
    within:{
        type:Number,
    },
    way:{
        type:String,
    },
    outside:{
        type:Number,
    },
    link:{//课外环节
        type:String
    },
    target:{type:String}//课程目标，选择
  })
  
  return mongoose.model('TheoryTeach', TheoryTeachSchema, 'theoryTeach');
}