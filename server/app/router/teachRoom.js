module.exports = app => {
    // 教研室
    const { router, controller } = app;
    router.get('/getTeachRoom', controller.teachRoom.getTeachRoom);
    router.get('/getTeacherByRoom', controller.teachRoom.getTeacherByRoom);
    router.post('/addTeachRoom', controller.teachRoom.addTeachRoom);
    router.post('/updateTeachRoom', controller.teachRoom.updateTeachRoom);
    router.post('/delTeachRoom', controller.teachRoom.delTeachRoom);
};