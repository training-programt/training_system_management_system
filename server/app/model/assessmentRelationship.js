'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AssessmentRelationshipSchema = new Schema({
    evaluationCriterion: { type: String},
    weight: { type: Number},
    assessmentGoal: {
      type: Schema.Types.ObjectId,
      ref: 'AssessmentGoal',
    }
  })

  return mongoose.model('AssessmentRelationship', AssessmentRelationshipSchema, 'assessmentRelationship');
}