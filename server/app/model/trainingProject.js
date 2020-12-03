'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingProjectSchema = new Schema({
    name: {type: String},
    major_id: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    writer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    schoolyear_id: {
      type: Schema.Types.ObjectId,
      ref: 'Schoolyear'
    },
    schoolRequirement_id: {
      type: Schema.Types.ObjectId,
      ref: 'SchoolRequirement'
    },
    graducationRequirement_id: {
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    },
    trainingObjective_id: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingObjective'
    },

  })

  return mongoose.model('TrainingProject', TrainingProjectSchema, 'TrainingProject');
} 