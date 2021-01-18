'use strict'
//专业具体目标表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorObjectiveSchema = new Schema({
    objective_name: { type: String },
    description: {type:String},
  })
  return mongoose.model('MajorObjective', MajorObjectiveSchema, 'majorObjective');
}