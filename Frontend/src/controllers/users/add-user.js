import page from '../../databus/page';
import userAddTpl from '../../views/user-add.art';
import { userAdd as userAddModel } from '../../models/user-add';

//添加用户
export const addUser = () => {
  const $btnClose = $('user-close');
  const html = userAddTpl();
  $('#user-list-box').after(html);
  
  //提交表单
  const _save = async() => {
    const data = $('#user-form').serialize();
    const result =await userAddModel(data);
    if(result) {
      page.setCurPage(1);
      $('body').trigger('addUser');
      $btnClose.click();
    }
  }
  
  //添加用户，点击保存绑定事件
  $('#user-save').on('click', _save);
};