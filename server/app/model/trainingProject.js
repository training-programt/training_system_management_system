'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingProjectSchema = new Schema({
    name: {type: String},
    major: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    schoolyear: {
      type: Schema.Types.ObjectId,
      ref: 'Schoolyear'
    },
    schoolRequirement: {
      type: Schema.Types.ObjectId,
      ref: 'SchoolRequirement'
    },
    graducationRequirement: {
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    },
    trainingObjective: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingObjective'
    },

  })

  return mongoose.model('TrainingProject', TrainingProjectSchema, 'TrainingProject');
} 