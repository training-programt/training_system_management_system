module.exports = app => {
  // 培养方案
  const { router, controller } = app;
  router.get('/getProjectList', controller.trainingProject.getProjectList);
  router.post('/createProject', controller.trainingProject.createProject);
  router.post('/delProject', controller.trainingProject.delProject);
  router.post('/updateProject', controller.trainingProject.updateProject);
  router.post('/updateObject', controller.trainingProject.updateObject);
  router.post('/updateRequirement', controller.trainingProject.updateRequirement);
  router.get('/getRowColData', controller.trainingProject.getRowColData);
  router.get('/getTable2RowCol', controller.trainingProject.getTable2RowCol);

  router.post('/getProjectDetail', controller.trainingProject.getProjectDetail);
  router.post('/getObjectData', controller.trainingProject.getObjectData);
};