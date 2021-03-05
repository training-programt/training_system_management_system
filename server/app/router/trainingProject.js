module.exports = app => {
  // 培养方案
  const { router, controller } = app;
  
  router.get('/getProjectList', controller.trainingProject.getProjectList);
  router.post('/createProject', controller.trainingProject.createProject);

};