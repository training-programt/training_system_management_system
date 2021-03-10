'use strict'
//专业培养目标与毕业要求关系矩阵
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorObjReqRelationSchema = new Schema({
    explain: { type: String },
    relation: [
      {
        '0': String,
        '1': String,
        '2': String,
        '3': String,
        '4': String,
        '5': String,
        '6': String,
        '7': String,
        '8': String,
        '9': String,
        '10': String,
      }
    ],
  })
  return mongoose.model('MajorObjReqRelation', MajorObjReqRelationSchema, 'majorObjReqRelation');
}