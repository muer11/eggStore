
module.exports = () => {
    const jwt = require('jsonwebtoken');
    return async function (ctx, next) {
      // console.log("request1111"+ctx.request);
      if (ctx.request.header['authorization']) {
        let token = ctx.request.header['authorization'].split(' ')[1];
        // console.log("token2222"+token)
        let decoded;
        //解码token
        try {
          decoded = jwt.verify(token, 'sinner77');
        } catch (error) {
          if (error.name == 'TokenExpiredError') {
            console.log('时间到期---')
            ctx.status = 401;
            ctx.body = {
              message: 'token过期',
            }
            return;
            //重新发放令牌 ?较适用于记住密码
            // token = jwt.sign({
            //   user_id: 8,
            //   user_name: 'muer11'
            // }, 'sinner77', {
            //   expiresIn: '60s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
            // });
            // ctx.cookies.set('token', token, {
            //   maxAge: 60 * 1000,
            //   httpOnly: false,
            //   overwrite: true,
            //   signed: false
            // });
            // ctx.body = {
            //   // "session": token,
            //   'errorCode':1,
            //   'errorMsg':'token失效',
            //   'token':token
            // }
            // console.log(token);
          } else {
            ctx.status = 401;
            ctx.body = {
              message: 'token失效'
            }
            return;
          }
        }
        //重置cookie时间
        ctx.cookies.set('token', token, {
          maxAge: 60 * 1000,
          httpOnly: false,
          overwrite: true,
          signed: false
        });
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '没有token'
        }
        return;
      }
    }
  };
