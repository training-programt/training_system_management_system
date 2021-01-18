'use strict'
// 菜单表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema({
    name: { type: String },
    icon: { type: String },
    type: { type: Number },
    path: { type: String },
    level: { type: Number },
    sort: { type: Number },
    role: { type: Schema.Types.ObjectId,ref:'Role'},
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'Menu'
    }],
    parent:{
      type: Schema.Types.ObjectId,
      ref: 'Menu'
    }
  })

  MenuSchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Menu'
  })

  return mongoose.model('Menu', MenuSchema, 'menu');
}