import positionAddTpl from '../../views/position-add.art';

import { positionAdd as positionAddModel } from '../../models/position-add';

//添加职位
export const addPosition = () => {
  const $btnClose = $('position-close');
  const date = new Date().toLocaleDateString();
  const html = positionAddTpl({
    date
  });
  $('#positions-list-box').after(html);
  //提交表单
  const _save = async() => {
    const data = $('#position-form').serialize();
    console.log(data)
    const result =await positionAddModel(data);
    if(result) {
      $('body').trigger('changeData');
      $btnClose.click();
    }
  }
  
  //添加职位，点击保存绑定事件
  $('#position-save').on('click', _save);
};