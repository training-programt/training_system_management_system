module.exports = app => {
  // 审核
  const { router, controller } = app;
  router.get('/getAuditList', controller.audit.getAudit);
  router.get('/getAllAudit', controller.audit.getAllAudit);
  router.post('/addAudit', controller.audit.addAudit);
  router.post('/updateAudit', controller.audit.updateAudit);
  router.post('/delAudit', controller.audit.delAudit);
  router.post('/delMoreAudit', controller.audit.delMoreAudit);
};