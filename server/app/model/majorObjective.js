'use strict'
//专业培养目标表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorObjectiveSchema = new Schema({
    major: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    school_objective: { type: String },
    objectives: [{
      objective_name: { type: String },
      description: { type: String },
    }]
  })
  return mongoose.model('MajorObjective', MajorObjectiveSchema, 'majorObjective');
}