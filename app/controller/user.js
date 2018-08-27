const Controller = require("egg").Controller;
class UserController extends Controller{
	async addUser(){
		const ctx = this.ctx;
		const data = ctx.request.body;
		const { username, password } = ctx.request.body;
		//const user =  await ctx.loginAndGetUSer(username, password);
		const user = await ctx.service.user.add(data);
		ctx.session.user = user;
		const { id, schemaster } = user || {};
		ctx.body = {
			data : {
				id,
				schemaster,
				username
			},
			message : 'success'
		}
	}
	async judgeUser(){
		const username = this.ctx.query;
		const judgeUsername = await this.ctx.service.user.read(username);
		if(judgeUsername.length > 0){
			// this.ctx.body = 1;
			this.ctx.body = judgeUsername[0].id;
		}else{
			this.ctx.body = null;
		}
	}
	async judgeMobile(){
		const mobile1 = this.ctx.query;
		const findMobile = await this.ctx.service.user.read(mobile1);
		if(findMobile.length > 0){
			this.ctx.body = 1;
		}else{
			this.ctx.body = 0;
		}
	}
	async confirmPassword(){
		const userInfo = {
			name : this.ctx.query.name,
			password: this.ctx.query.password,
			userId: this.ctx.query.userId
		}
		// const userId = this.ctx.query.userId;
		const judgePassword = await this.ctx.service.user.confirm({
			name: userInfo.name,
			password: userInfo.password,
		});
		console.log(userInfo);
		console.log(judgePassword);

		if(judgePassword.length > 0){
			let jwt = require('jsonwebtoken');
			let token = jwt.sign({
				user_id: userInfo.userId,
				user_name: userInfo.name,
			}, 'sinner77', {
				expiresIn: '60s' //时间根据自己定，具体可参考jsonwebtoken插件官方说明
			});
			this.ctx.cookies.set('token', token, {maxAge:60*1000,httpOnly:true,overwrite:true,signed:false})
			// this.ctx.cookies.set("user",userInfo.name)
			//this.ctx.body = true;
			this.ctx.body = {
				'code':1,
				'info':'登录成功',
				'token':token,
			};
		}else{
			this.ctx.body = {
				'code': 0,
				'info': "登录失败",
			}
		}
	}

	async isLogin(){
		
	}
}
module.exports = UserController;
