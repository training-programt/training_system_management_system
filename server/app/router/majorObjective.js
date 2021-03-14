module.exports = app => {
  // 培养目标
  const { router, controller } = app;
  router.get('/getMajorObjective', controller.majorObjective.getMajorObjective);
  router.post('/addMajorObjective', controller.majorObjective.addMajorObjective);
  router.post('/getMajorObjectiveDetails', controller.majorObjective.getMajorObjectiveDetails);
  router.post('/delMajorObjective', controller.majorObjective.delMajorObjective);
};