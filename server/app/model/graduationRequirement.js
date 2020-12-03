'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GraduationRequirementSchema = new Schema({
    name: {type: String},
    description: {type: String},
    analysis: {type: String},
    schoolRequirement: {
      type: Schema.Types.ObjectId,
      ref: 'SchoolRequirement'
    }
  })

  GraduationRequirementSchema.virtual('pointList', {
    localField: '_id',
    foreignField: 'graduationRequirement_id',
    justOne: false,
    ref: 'Point'
  })

  return mongoose.model('GraduationRequirement', GraduationRequirementSchema, 'graduationRequirement');
}