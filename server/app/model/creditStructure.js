//学分结构表
'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CreditStructureSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    type:{type:String},//课程类型
    credit:{type:Number},//学分
    courseSystem:{
        type:Schema.Types.ObjectId,
            ref:'CourseSystem'
    }
  })
  
  return mongoose.model('CreditStructure',CreditStructureSchema, 'creditStructure');
}