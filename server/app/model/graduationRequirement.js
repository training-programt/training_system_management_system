'use strict'
//毕业要求表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GraduationRequirementSchema = new Schema({
    description: {type: String},
    analysis: {type: String},
    nationalRequirement: [{//国家毕业要求
      type: Schema.Types.ObjectId,
      ref: 'NationalRequirement'
    }],
    majorRequirement: [{//专业毕业要求 12个
      type: Schema.Types.ObjectId,
      ref: 'MajorRequirement'
    }]
  })

  GraduationRequirementSchema.virtual('pointList', {
    localField: '_id',
    foreignField: 'graduationRequirement',
    justOne: false,
    ref: 'Point'
  })

  return mongoose.model('GraduationRequirement', GraduationRequirementSchema, 'graduationRequirement');
}