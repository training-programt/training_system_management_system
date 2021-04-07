module.exports = app => {
    // 授课教师
    const { router, controller } = app;
    router.get('/getApproval', controller.teachingTeacher.getApproval);
    router.post('/addApproval', controller.teachingTeacher.addApproval);
    router.post('/findApproval', controller.teachingTeacher.findApproval);
    router.post('/delApproval', controller.teachingTeacher.delApproval);

    router.get('/getAudit', controller.teachingTeacher.getAudit);
    router.post('/addAudit', controller.teachingTeacher.addAudit);
    router.post('/findAudit', controller.teachingTeacher.findAudit);
    router.post('/delAudit', controller.teachingTeacher.delAudit);

    router.post('/updateApprovalOpinion', controller.teachingTeacher.updateApprovalOpinion);
    router.post('/updateAuditOpinion', controller.teachingTeacher.updateAuditOpinion);

  };