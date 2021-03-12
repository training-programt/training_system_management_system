module.exports = app => {
  // 指标点
  const { router, controller } = app;
  router.post('/addPoint', controller.point.addPoint);
  
};