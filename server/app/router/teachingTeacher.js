module.exports = app => {
    // 授课教师
    const { router, controller } = app;
    router.post('/addApproval', controller.teachingTeacher.addApproval);
  
  };