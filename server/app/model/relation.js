'use strict'
//教学大纲 课程教学目标与毕业要求的对应关系
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RelationSchema = new Schema({
    major_requirement: {
      type: Schema.Types.ObjectId,
      ref: 'MajorRequirement'
    },
    point:{
        type: Schema.Types.ObjectId,
        ref: 'Point'
    },
    teach_goal:{
        type: Schema.Types.ObjectId,
        ref: 'TeachingGoal'
    },
    weight:{type:String},
  })

  return mongoose.model('Relation', RelationSchema, 'relation');
}