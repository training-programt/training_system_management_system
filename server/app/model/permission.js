'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PermissionSchema = new Schema({
    permission: { type: String },
    permissionName: { type: String },
    // role_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Role'
    // }
  })

  return mongoose.model('Permission', PermissionSchema, 'permission');
}