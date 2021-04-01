module.exports = app => {
  // 审批
  const { router, controller } = app;
  router.get('/getApprovalList', controller.approval.getApproval);
  router.get('/getAllApproval', controller.approval.getAllApproval);
  router.post('/addApproval', controller.approval.addApproval);
  router.post('/updateApproval', controller.approval.updateApproval);
  router.post('/delApproval', controller.approval.delApproval);
  router.post('/delMoreApproval', controller.approval.delMoreApproval);
};