module.exports = app => {
    // 参考书
    const { router, controller } = app;
    router.get('/getBook', controller.book.getBook);
    router.post('/addBook', controller.book.addBook);
    router.post('/delBook', controller.book.delBook);

};