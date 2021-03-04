module.exports = app => {
    // 教研室
    const { router, controller } = app;
    router.get('/getTeachRoom', controller.teachRoom.getTeachRoom);
    router.get('/getRoomDetail', controller.teachRoom.getRoomDetail);
    router.post('/addTeachRoom', controller.teachRoom.addTeachRoom);
    router.post('/updateTeachRoom', controller.teachRoom.updateTeachRoom);
    router.post('/delTeachRoom', controller.teachRoom.delTeachRoom);
    router.post('/exportOneRoom', controller.teachRoom.exportOneRoom);
};