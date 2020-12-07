'use strict'
//课程实验（实践）教学内容及学时分配
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PracticeTeachSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    name:{type:String},
    objective:{type:String},//实验目的
    content:{type:String},//实验内容
    practice_way:{type:String},//选做/必做
    type:{type:String},
    teaching_way:{type:String},//教学方式
    time:{type:String},//学时分配
    
  })
  
  return mongoose.model('PracticeTeach', PracticeTeachSchema, 'practiceTeach');
}