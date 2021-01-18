module.exports = app => {
    // 菜单
    const { router, controller } = app;
    router.get('/menu', controller.menu.getMenu);
    router.post('/allMenu', controller.menu.getAllMenu);
    router.post('/menuData', controller.menu.getMenuByRole);
    router.post('/addMenu', controller.menu.addMenu);
    router.post('/delMenu', controller.menu.delMenu);
    router.post('/updataMenu', controller.menu.updataMenu);
};