'use strict'
//角色表 1 2 3 4
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PermissionSchema = new Schema({
    permission: { type: String },
    permissionName: { type: String }
  })
  return mongoose.model('Permission', PermissionSchema, 'permission');
}