'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoleSchema = new Schema({
    role: { type: String },
    roleName: { type: String },
    permission: [{
      type: Schema.Types.ObjectId,
      ref: 'Permission',
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