module.exports = app => {
    // 教研室
    const { router, controller } = app;
    router.get('/getTeachRoom', controller.teachRoom.getTeachRoom);
};