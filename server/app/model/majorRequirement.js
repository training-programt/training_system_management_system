'use strict'
//专业毕业要求
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorRequirementSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    name: { type: String },
    description:{type:String},
    point:[{//毕业要求指标点
      type:Schema.Types.ObjectId,
      ref:'Point'
    }],
    
  })

  return mongoose.model('MajorRequirement', MajorRequirementSchema, 'majorRequirement');
}