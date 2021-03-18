'use strict'
//毕业要求表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GraduationRequirementSchema = new Schema({
    description: { type: String },
    majorRequirement: [{
      name: { type: String },
      description: { type: String },
      point: [{//毕业要求指标点
        type: Schema.Types.ObjectId,
        ref: 'Point'
      }],
    }]
  })

  return mongoose.model('GraduationRequirement', GraduationRequirementSchema, 'graduationRequirement');
}