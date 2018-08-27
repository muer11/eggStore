const Controller = require('egg').Controller;

class NewsController extends Controller{
	async list(){
		// const dataList = {
		// 	list: [
		// 		{ id: 1, title: 'this is news 1', url: '/news/1' },
		// 		{ id: 2, title: 'this is news 2', url: '/news/2' },
		// 	]
		// };

		const ctx = this.ctx;
		const page = ctx.query.page || 1;
		const result = await this.app.mysql.insert('list', {name: 'test111'});
		console.log(result);
		// const newsList = await ctx.service.news.list(page);
		//await this.ctx.render('news/list.tpl', dataList);
		await ctx.render('news/list.tpl', {list: 1});
	}
}

module.exports = NewsController;
