module.exports = app => {
  // 指标点
  const { router, controller } = app;
  router.post('/addPoint', controller.point.addPoint);
  router.get('/getAllPoint', controller.point.getAllPoint);
  router.post('/addCurrRelationship', controller.point.addCurrRelationship);
  router.post('/delCurrRelationship', controller.point.delCurrRelationship);
  
};