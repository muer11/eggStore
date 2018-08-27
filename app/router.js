module.exports = app => {
	const { router, controller } = app;
	const checktoken = app.middleware.checktoken();
	router.get('/', controller.home.index);
	router.get('/news', controller.news.list);
	router.post('/addUser',checktoken, controller.user.addUser);
	router.get('/judgeUser', controller.user.judgeUser);
	router.get('/confirmPassword', controller.user.confirmPassword);
	router.get('/judgeMobile', controller.user.judgeMobile);
	router.get('/findProducts', controller.product.findProducts);
	router.get('/findDetail', controller.product.findDetail);
	router.get('/findSkuInfo', controller.product.findSkuInfo);
	router.get('/addCart',checktoken, controller.cart.addCart);
	router.get('/sumQuantity', controller.cart.sumQuantity);
	router.get('/listProduct',checktoken, controller.cart.listProduct);
	router.get('/changeInitQuantity',checktoken, controller.cart.changeInitQuantity);
	router.get('/deleteItems',checktoken, controller.cart.deleteItems);
	router.get('/judgeIsAddCart',checktoken, controller.cart.judgeIsAddCart);
	router.get('/addReceivers', controller.receiver.add);
	router.get('/selectReceiver', controller.receiver.select);
	router.get('/showReceiver', controller.receiver.show);
	router.get('/deleteReceiver', controller.receiver.delete);
	router.get('/modifyReceiver', controller.receiver.modify);
	router.get('/modifyDefault', controller.receiver.modifyDefault);
	router.get('/selectSkus', controller.checkout.selectSkus);
	router.get('/addOrder', controller.payment.addOrder);
	router.get('/findOrder', controller.payment.findOrder);
	// router.get('/isLogin', controller.user.isLogin);//判断是否已登录
}
