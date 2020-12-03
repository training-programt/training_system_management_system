'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingObjectiveSchema = new Schema({
    objective: { type: String },
    majorObjectives: [{
      title: { type: String },
      description: { type: String },
      state: { type: Boolean },
    }],
    schoolRequirement_id: {
      type: Schema.Types.ObjectId,
      ref: 'SchoolRequirement'
    },
    schoolyear_id: {
      type: Schema.Types.ObjectId,
      ref: 'Schoolyear'
    }
  })
  
  

  return mongoose.model('TrainingObjective', TrainingObjectiveSchema, 'trainingObjective');
}