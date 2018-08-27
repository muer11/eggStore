exports.keys = '_1499075971408_463';

//添加view配置
exports.view = {
	defaultViewEngine : 'nunjucks',
	mapping: {
		'.tpl': 'nunjucks'
	}
}

exports.news = {
	pageSize: 5,
	serverUrl: '/app'
}

exports.middleware = [
	'robot',
	'checktoken',
	'notFoundHandler',
];

exports.robot = {
	ua: [
		/curl/i,
		/Baiduspider/i,
	]
}

exports.mysql = {
	client : {
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: 'root',
		database: 'test',
	},
	app: true,
	agent: false
};
// module.exports = {
//   middleware: [ 'notfoundHandler' ],
// };
module.exports = appInfo => {
  const config = {};
  // should change to your own
  config.keys = appInfo.name + '_1499075971408_463';
  //关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    // 白名单
    domainWhiteList: [ 'http://localhost:8080' ]
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
	};
	config.onerror = {
		errorPageUrl: '/',
	};
  // 加载 errorHandler 中间件
	config.middleware = ['notFoundHandler'];
	// config.errorHandler = {
	// 	// 只对 / 前缀的 url 路径生效
	// 	match: '/',
	// };
  return config;
};

