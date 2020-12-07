'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/menu', controller.menu.getMenu);
  router.post('/allMenu', controller.menu.getAllMenu);
  router.post('/addMenu', controller.menu.addMenu);


  router.get('/getPermission', controller.permission.getPermission);
  router.post('/addPermission', controller.permission.addPermission);


  router.get('/getRole', controller.role.getRole);


  router.post('/upload', controller.home.upload);
};
