'use strict'
//课程理论教学内容及学时分配
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TheoryTeachSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    unit:{type:String},//教学单元
    content:{type:String},//教学内容
    requirements:{type:Text},//分成的几点，写入数据库成为一段话
    within:{//有一些信息可以从课程拿到,怎么联系和课程联系？
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    way:{
        type:String,
    },
    outside:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    link:{//课外环节
        type:String
    },
    target:{type:String}//课程目标，选择
  })
  
  return mongoose.model('TheoryTeach', TheoryTeachSchema, 'theoryTeach');
}