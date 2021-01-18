'use strict'
//角色表 1 2 3 4
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoleSchema = new Schema({
    role: { type: String },
    roleName: { type: String },
    menu: [{
      type: Schema.Types.ObjectId,
      ref: 'Menu',
    }] 
  })

  // RoleSchema.virtual('permissions', {
  //   localField: '_id',
  //   foreignField: 'role_id',
  //   justOne: false,
  //   ref: 'Permission'
  // })

  return mongoose.model('Role', RoleSchema, 'role');
}