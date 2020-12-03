'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SchoolRequirementSchema = new Schema({
    objective: { type: String },

    nationRequirement: [{
      title: { type: String },
      description: { type: String },
      state: { type: Boolean }
    }],

    schoolyear_id: {
      type: Schema.Types.ObjectId,
      ref: 'Schoolyear'
    }
  })

  return mongoose.model('SchoolRequirement', SchoolRequirementSchema, 'schoolRequirement');
}