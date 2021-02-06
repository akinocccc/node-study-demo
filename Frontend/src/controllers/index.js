import indexTpl from '../views/index.art';
import { auth as authModel } from '../models/auth';
import pageHeader from '../components/pageheader';

import img from '../assets/user-pic.jpg'

const index = (router) => {
  return async(req, res, next) => {
    const result = await authModel();
    if(result.ret) {
      const htmlIndex = indexTpl({
        subRouter: res._subRouteView,
        img
      });

      //渲染首页
      next(htmlIndex);
      
      //window.resize() 让页面撑满这个窗口
      $(window, '.warpper').resize();

      //加载页面导航栏
      pageHeader();
      
      const $as = $('#sidebar-menu li:not(:first-child) a');
      
      // $lis.on('click', function() {
      //   const url = $(this).attr('to');
      //   router.go(url);
      // });
      
      const hash = location.hash;
      $as
        .filter(`[href="${hash}"]`)
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active');

    } else {
      router.go('/signin')
    }
  };
};

export default index;