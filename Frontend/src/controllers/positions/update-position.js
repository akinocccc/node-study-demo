import positionAddTpl from '../../views/position-add.art';

import { positionUpdate as positionUpdateModel } from '../../models/position-update';

//修改职位
export const updatePosition = (id, oldData) => {
  const $btnClose = $('position-close');
  const html = positionAddTpl({
    data: oldData
  });
  console.log(id)
  $('#positions-list-box').after(html);
  //提交表单
  const _save = async() => {
    let updateObj = {};
    $.each($('#position-form').serializeArray(), (_, kv) => {
      updateObj[kv.name] = kv.value;
    });
    updateObj.id = id;
    await positionUpdateModel(updateObj);
    $('body').trigger('changeData');
    $btnClose.click();
  }
  
  //添加职位，点击保存绑定事件
  $('#position-save').on('click', _save);
};