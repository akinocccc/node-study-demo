/*
 * @Description: 数据控制器
 * @Author: AS
 * @Date: 2021-02-04 01:57:20
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 12:39:59
 * @FilePath: \AdminLte\Frontend\src\controllers\index.js
 */

import indexTpl from '../views/index.art';
import signinTpl from '../views/signin.art';
import usersTpl from '../views/users.art';
import usersListTpl from '../views/users-list.art';
import usersListPageTpl from '../views/users-pages.art';

const htmlIndex = indexTpl({});
const htmlSignin = signinTpl({});

const PAGESIZE = 3;
let curPage = 1;
let UsersDataList = [];

//登录页面提交表单处理方法
const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    const data = $('#signin').serialize();
    $.ajax({
      url: '/api/users/signin',
      type: 'post',
      data,
      success(res) {
        console.log(res)
        if(res.data.result) {
          router.go('/index');
        }
      }
    })
  };
};

//注册用户
const _signup = () => {
  const $btnClose = $('user-close');
  
  //提交表单
  const data = $('#user-form').serialize();
  $.ajax({
    url: '/api/users/signup',
    type: 'post',
    data,
    success(res) {
      curPage = 1;
      _loadData();
      _list();
    }
  });  
};

//设置页码高亮
const _setPageActive = () => {
  const curPageDom = $(`#users-page-list li:nth-child(${curPage+1})`);
  curPageDom.addClass('active').siblings().removeClass('active');
}

//数据分页
const _pagination = (data) => {
  const total = data.length;
  const pageCount = Math.ceil(total/PAGESIZE);
  const pageArray = new Array(pageCount);
  const htmlPage = usersListPageTpl({
    pageArray
  });
  
  $('#users-page').html(htmlPage);
  _setPageActive();
  $('#users-page-list li:not(:first-child,:last-child)').on('click', function() {
    _setPageActive();
    curPage = $(this).index();
    _list();
  });
};

const _loadData = () => {
  $.ajax({
    url: '/api/users/list',
    async: false,
    success(res) {
      UsersDataList = res.data;
      //分页
      _pagination(res.data);
    }
  });
};

//获取用户列表
const _list = () => {
  let start = (curPage-1) * PAGESIZE;
  let curPageDataList = UsersDataList.slice(start, start + PAGESIZE)

  if(curPageDataList.length === 0){
    curPage--;
    start = (curPage-1) * PAGESIZE;
    curPageDataList = UsersDataList.slice(start, start + PAGESIZE)
  }
  _setPageActive();

  $('#users-list').html(usersListTpl({
    data: curPageDataList
  }))
};

//管理员登录
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $('#submit').on('click', _handleSubmit(router));
  };
};

//删除用户
const _removeUser = (userId) => {
  $.ajax({
    url: '/api/users/remove',
    type: 'delete',
    data: {
      userId: userId,
    },
    success(res) {
      curPage = $('#users-page-list .active').index();
      _loadData();
      _list();
    }
  });
};

const index = (router) => {
  return (req, res, next) => {
    res.render(htmlIndex);

    //window.resize() 让页面撑满这个窗口
    $(window, '.warpper').resize();

    //填充用户列表
    $('#content').html(usersTpl());

    //初次渲染list
    _loadData();
    _list();

    //为翻页按钮绑定事件
    $('#users-page').on('click', '#pre-page', function() {
      if(curPage > 1) {
        curPage--;
        _list();
      }
    });
    $('#users-page').on('click', '#next-page', function() {
      if(curPage < Math.ceil(UsersDataList.length / PAGESIZE)) {
        curPage++;
        _list();
      }
    });

    //为登出按钮绑定事件
    $('#user-signout').on('click', () => {
      router.go('/signin');
    })

    //为删除按钮绑定事件
    $("#users-list").on('click','#del-btn',function(){
      const userId = $(this).data('id');
      _removeUser(userId);
    });

    //用户注册，点击保存事件
    $('#user-save').on('click', _signup);
  }
};

export {
  signin,
  index,
};