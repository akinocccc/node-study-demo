/*
 * @Description: 数据控制器
 * @Author: AS
 * @Date: 2021-02-04 01:57:20
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 12:39:59
 * @FilePath: \AdminLte\Frontend\src\controllers\index.js
 */

import router from '../../routes/index';

import usersTpl from '../../views/users.art';
import usersListTpl from '../../views/users-list.art';

import pagination from '../../components/pagination';
import { addUser } from '../../controllers/users/add-user';
import { userList as userListModel } from '../../models/users-list';
import { userRemove as userRemoveModel } from '../../models/user-remove';
import page from '../../databus/page';
import { auth as authModel } from '../../models/auth';


let UsersDataList = [];
const PAGESIZE = page.PAGESIZE;

//获取用户列表
const _list = () => {
  let start = (page.curPage-1) * PAGESIZE;
  let pageNoDataList = UsersDataList.slice(start, start + PAGESIZE)

  if(pageNoDataList.length === 0){
    page.setCurPage(page.curPage-1);
    start = (page.curPage-1) * PAGESIZE;
    pageNoDataList = UsersDataList.slice(start, start + PAGESIZE)
    pagination(UsersDataList);
  }

  $('#users-list').html(usersListTpl({
    data: pageNoDataList
  }))
};

//加载用户列表数据
const _loadData = async() => {
  const result = await userListModel();
  UsersDataList = result
  //分页
  pagination(UsersDataList);
  _list();
};

//删除用户
const _removeUser = async(userId) => {
  const result = await userRemoveModel(userId);
  if(result) {
    page.setCurPage($('#users-page-list .active').index());
    _loadData();
  }
};

//页面绑定事件
const _methods = () => {
  //为登出按钮绑定事件
  $('#user-signout').on('click', () => {
    $.ajax({
      url: '/api/users/signout',
      dataType: 'json',
      headers: {
        'X-Access-Token': localStorage.getItem('AdminLTE-token') || ''
      },
      success(result) {
        if(result.ret) {
          localStorage.setItem('AdminLTE-token', null);
          router.go('/signin');
        }
      }
    });
  });

  //为删除按钮绑定事件
  $("#users-list").on('click', '#del-btn', function(){
    const userId = $(this).data('id');
    _removeUser(userId);
  });
};

const _subscribe = () => {
  $('body').on('changeCurPage', () => {
    _list();
  });
  $('body').on('addUser', () => {
    _loadData();
  });
};

//渲染首页
const _loadUserList = (res, next) => {
  //填充用户列表
  // $('#content').html(usersTpl());
  next();
  res.render(usersTpl());

  $('#add-user-btn').on('click', addUser);

  //初次渲染list
  _loadData();

  //绑定页面事件
  _methods();

  //订阅事件
  _subscribe();
};

const listUser = (router) => {
  return async(req, res, next) => {
    const result = await authModel();
    if(result) {
      _loadUserList(res, next);
    } else {
      router.go('/signin');
    }
  }
};

export default listUser;