/*
 * @Description: users数据控制器
 * @Author: AS
 * @Date: 2021-02-04 13:00:26
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 15:26:23
 * @FilePath: \AdminLte\Backend\controllers\users.js
 */

const  usersModel = require('../models/users');
const { hash, compare } = require('../utils/tools');

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
  
  if(findResult) {
    const compareResult = await compare(password, findResult.password);
    if(compareResult) {
      res.render('succ', {
        data: JSON.stringify ({
          message: '登录成功',
          result: true
        })
      });
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名/密码错误',
          result: false
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

exports.signup = signup;
exports.signin = signin;
exports.list = list;
exports.remove = remove;