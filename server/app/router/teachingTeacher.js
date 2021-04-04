module.exports = app => {
    // 授课教师
    const { router, controller } = app;
    router.get('/getApproval', controller.teachingTeacher.getApproval);
    router.post('/addApproval', controller.teachingTeacher.addApproval);
  
  };