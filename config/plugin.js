//是用模板引擎nunkucks, 将文件保存到数据库中，所以需要跟数据库mysql连通
exports.nunjucks = {
	enable: true,
	package: 'egg-view-nunjucks'
}

exports.mysql = {
	enable: true,
	package: 'egg-mysql'
}

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.onerror = {
  enable: true,
  package: 'egg-onerror'
};

// exports.errorHandler = {
//   enable: true,
//   package: 'errorhandler'
// };