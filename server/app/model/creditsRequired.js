'use strict'
//学分要求表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CreditsRequiredSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    description:{type:String},
    course_system:[{
        type:Schema.Types.ObjectId,
        ref:'CourseSystem'
    }],//课程体系
  })
  
  return mongoose.model('CreditsRequired', CreditsRequiredSchema, 'creditsRequired');
}