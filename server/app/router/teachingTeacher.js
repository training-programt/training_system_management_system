module.exports = app => {
    // 授课教师
    const { router, controller } = app;
    router.get('/getApproval', controller.teachingTeacher.getApproval);
    router.post('/addApproval', controller.teachingTeacher.addApproval);
    
    router.get('/getAudit', controller.teachingTeacher.getAudit);
    router.post('/addAudit', controller.teachingTeacher.addAudit);
  };