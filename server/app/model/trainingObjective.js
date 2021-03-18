'use strict'
//培养目标表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingObjectiveSchema = new Schema({
    professional_training_objectives: { type: String },//专业培养目标总概括
    //专业具体培养目标
    specific_training_objectives: [{
      objective_name: { type: String },
      description: { type: String },
    }],
  })

  return mongoose.model('TrainingObjective', TrainingObjectiveSchema, 'trainingObjective');
}