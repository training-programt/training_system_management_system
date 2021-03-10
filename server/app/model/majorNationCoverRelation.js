'use strict'
//本专业毕业要求与认证标准毕业要求覆盖情况
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorNationCoverRelationSchema = new Schema({
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
        '11': String,
        '12': String,
        '13': String,
        '14': String,
        '15': String,
      }
    ],
  })
  return mongoose.model('MajorNationCoverRelation', MajorNationCoverRelationSchema, 'majorNationCoverRelation');
}