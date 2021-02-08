import usersListPageTpl from '../views/users-pages.art';
import page from '../databus/page';

//设置页码高亮
const _setPageActive = () => {
  const curPageDom = $(`#users-page-list li:nth-child(${page.curPage+1})`);
  curPageDom.addClass('active').siblings().removeClass('active');
};

//显示分页效果
const pagination = (data) => {
  const total = data.length;
  const pageCount = Math.ceil(total/page.PAGESIZE);
  const pageArray = new Array(pageCount);
  const htmlPage = usersListPageTpl({
    pageArray
  });
  
  $('#users-page').html(htmlPage);
  _setPageActive();

  _bindEvent(Math.ceil(data.length / page.PAGESIZE));
};

const _bindEvent = (maxPageNo) => {
  //绑定点击页码事件
  $('#users-page-list li:not(:first-child,:last-child)').off('click').on('click', function() {
    const index = $(this).index();
    page.setCurPage(index);
    $('body').trigger('changeCurPage', page.curPage);

    _setPageActive();
  });
  //绑定向前分页事件
  $('#users-page').on('click', '#pre-page', function() {
    if(page.curPage > 1) {
      page.setCurPage(page.curPage-1);
      $('body').trigger('changeCurPage', page.curPage);
      _setPageActive();
    }
  });
  //绑定向后翻页事件
  $('#users-page').on('click', '#next-page', function() {
    if(page.curPage < maxPageNo) {
      page.setCurPage(page.curPage+1);
      $('body').trigger('changeCurPage', page.curPage);
      _setPageActive();
    }
  });
};

export default pagination;
