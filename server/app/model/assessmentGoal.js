'use strict'
//考核环节与课程目标的对应关系
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AssessmentGoalSchema = new Schema({
    teaching_goal:{
        type: Schema.Types.ObjectId,
        ref: 'TeachingGoal'
    },
    assessment:{
        type: Schema.Types.ObjectId,
        ref: 'AttendanceProportion'
    },
    status:{type:Boolean}//√、×
  })
  
  return mongoose.model('AssessmentGoal',AssessmentGoalSchema, 'assessmentGoal');
}