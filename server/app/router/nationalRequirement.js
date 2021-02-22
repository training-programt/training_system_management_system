module.exports = app => {
  // 国家毕业要求
  const { router, controller } = app;
  router.get('/getNationalRequirement', controller.nationalRequirement.getRequirement);
  router.post('/addNationalRequirement', controller.nationalRequirement.addRequirement);
  router.post('/delNationalRequirement', controller.nationalRequirement.delRequirement);
};