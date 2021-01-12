module.exports = app => {
    // 专业
    const { router, controller } = app;
    router.get('/getMajor', controller.menu.getMajor);
    // router.post('/allMenu', controller.menu.getAllMenu);
    // router.post('/menuData', controller.menu.getMenuByRole);
    // router.post('/addMenu', controller.menu.addMenu);
    // router.post('/delMenu', controller.menu.delMenu);
    // router.post('/updataMenu', controller.menu.updataMenu);
};