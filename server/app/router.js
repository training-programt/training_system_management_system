'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/login', controller.login.login)

  router.get('/menu', controller.menu.getMenu);
  router.post('/allMenu', controller.menu.getAllMenu);
  router.post('/addMenu', controller.menu.addMenu);


  router.get('/getPermission', controller.permission.getPermission);
  router.post('/updatePermission', controller.permission.createOrUpdatePermission);


  router.get('/getRole', controller.role.getRole);

  router.get('/addTeacher', controller.teacher.addTeacher);


  router.post('/upload', controller.home.upload);
  router.get('/test', controller.home.getList);

};
