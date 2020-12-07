'use strict'
//课程教学目标表 与指标点毕业要求的关系是否要对应，还是直接生成
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachingGoalSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    target_course_name:{type:String},//课程目标
    target_course_describe:{type:String},//目标描述
    attendance_proportion:[{//课程目标考核方式及占比(％)（未考核项目填“/”）
      type:Schema.Types.ObjectId,
      ref:'AttendanceProportion'
    }
    ],
  })
  
  return mongoose.model('TeachingGoal', TeachingGoalSchema, 'teachingGoal');
}