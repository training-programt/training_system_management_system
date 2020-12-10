'use strict'
//培养目标表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingObjectiveSchema = new Schema({
    school_training_objectives: { type: String },//学校培养目标
    professional_training_objectives: [{//专业培养目标文字？Text？
      title: { type: String },
      description: { type: String },
      state: { type: Boolean },
    }],
    //专业具体培养目标
    specific_training_objectives: [{
      type: Schema.Types.ObjectId,
      ref: 'MajorObjective'
    }],
    grade: {
      type: Schema.Types.ObjectId,
      ref: 'Grade'
    }
  })
  
  return mongoose.model('TrainingObjective', TrainingObjectiveSchema, 'trainingObjective');
}