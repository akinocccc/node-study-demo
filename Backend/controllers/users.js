/*
 * @Description: users数据控制器
 * @Author: AS
 * @Date: 2021-02-04 13:00:26
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 15:26:23
 * @FilePath: \AdminLte\Backend\controllers\users.js
 */

const  usersModel = require('../models/users');
const { hash, compare, sign, verify } = require('../utils/tools');
const randomstring = require('randomstring')

//注册用户
const signup = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8');
  
  const { username, password } = req.body;

  //密码加密
  const bcryptPassword = await hash(password);

  //判断用户是否存在
  let findResult = await usersModel.findUser(username);

  if(findResult) {
    res.render('fail', {
      data: JSON.stringify ({
        message: '用户名存在'
      })
    });
  } else {
    //数据库没有该用户，添加用户
    let result = await usersModel.signup({
      username,
      password: bcryptPassword
    })

    res.render('succ', {
      data: JSON.stringify({
        message: '添加成功！'
      })
    });
  }
};

//用户登录
const signin = async(req, res) => {
  res.set('content-type', 'application/json; charset=utf-8');

  const { username, password } = req.body;
  const findResult = await usersModel.findUser(username);
  //验证用户是否合法
  if(findResult) {
    const compareResult = await compare(password, findResult.password);
    if(compareResult) {
      /* 通过cookie-session方式保存登录态 */
      /***********************************/
      /* 手动生成cookie
      /* const sessionId = randomstring.generate();
      /* res.set('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly`);
      /* console.log(sessionId);
      /***********************************/
      //使用cookie-session工具管理cookie
      //req.session.username = username;

      /* 使用token保存登录态 */
      const token = sign(username);
      res.set('X-Access-Token', token);

      res.render('succ', {
        data: JSON.stringify ({
          username
        })
      });

    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名/密码错误'
        })
      });
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名/密码错误',
        result: false
      })
    });
  }
  
};

//退出登录
const signout = async(req, res, next) => {
  res.render('succ', {
      data: JSON.stringify({
        message: '成功退出登录'
      })
    });
};

//获取用户列表
const list = async(req, res) => {
  res.set('content-type', 'application/json; charset=utf-8');
  const listResult = await usersModel.findList();
  res.render('succ', {
    data: JSON.stringify(listResult)
  });
};

//删除用户
const remove = async(req, res) => {
  const { userId } = req.body;
  res.set('content-type', 'application/json; charset=utf-8');
  let result = await usersModel.removeUser(userId);
  if(result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '删除成功'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '删除失败'
      })
    })
  }
  
}

const isAuth = (req, res, next) => {
  /* 通过session鉴权 */
  // if(req.session.username) {
  //   res.render('succ', {
  //     data: JSON.stringify({
  //       username: req.session.username
  //     })
  //   });
  // } else {
  //   res.render('fail', {
  //     data: JSON.stringify({
  //       message: '请登录'
  //     })
  //   });
  // }
  /* ************** */

  /* 通过token鉴权 */
  const token = req.get('X-Access-Token');
  try {
    const result = verify(token);
    res.render('succ', {
      data: JSON.stringify({
        username: req.session.username
      })
    });
  } catch(e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录'
      })
    });
  }
};

exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.list = list;
exports.remove = remove;
exports.isAuth = isAuth;