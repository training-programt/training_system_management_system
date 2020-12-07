'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema({
    icon: {type: String},
    key: {type: String},
    level: {type: Number},
    name: {type: String},
    sort: {type: Number},
    permission: {
      type: Schema.Types.ObjectId,
      ref: 'Permission'
    },
    children: [{
      type: Schema.Types.ObjectId, 
      ref: 'Menu' 
    }],
  })

  // MenuSchema.virtual('children', {
  //   localField: '_id',
  //   foreignField: 'parent',
  //   justOne: false,
  //   ref: 'Menu'
  // })

  return mongoose.model('Menu', MenuSchema, 'menu');
}