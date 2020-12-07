'use strict'
//国家毕业要求
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NationalRequirementSchema = new Schema({
    id:{type: Schema.Types.ObjectId, required: true},
    national_name: { type: String },
    nation_description: {type:String},
  })

  return mongoose.model('NationalRequirement', NationalRequirementSchema, 'nationalRequirement');
}