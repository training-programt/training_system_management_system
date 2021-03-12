module.exports = app => {
  // 国家毕业要求
  const { router, controller } = app;
  router.get('/getNationalRequirement', controller.nationalRequirement.getRequirement);
  router.post('/addNationalRequirement', controller.nationalRequirement.addRequirement);
  router.post('/updateNationalRequirement', controller.nationalRequirement.updateRequirement);
  router.post('/delNationalRequirement', controller.nationalRequirement.delRequirement);
  router.post('/downloadRequirement', controller.nationalRequirement.downloadRequirement);
  // router.post('/addPoint', controller.nationalRequirement.addPoint);
};