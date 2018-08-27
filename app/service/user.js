const Service = require('egg').Service;

class UserService extends Service{
	async add(user){
		const result = await this.app.mysql.insert('user', user);
		//const result = await this.app.mysql.select('list');
		console.log(result);
		return result;
	}
	async read(user){
		console.log(user);
		const userIsExist = await this.app.mysql.select('user',{
			where: user, //WHERE条件
			// columns: ['name'], //要查询的表字段
		});
		return JSON.parse(JSON.stringify(userIsExist)); //先将rowDataPacket对象转成json字符串再转成数组
	}
	async confirm(userInfo){
		const passwordConfirm = await this.app.mysql.select('user',{
			where: userInfo,
			columns: ['name', 'password']
		});
		return passwordConfirm;
	}
}

module.exports = UserService;