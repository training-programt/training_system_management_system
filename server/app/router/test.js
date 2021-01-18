module.exports = app => {
    // 其他
    const { router, controller } = app;
    router.post('/upload', controller.home.upload);
    router.get('/test', controller.home.getList);

};