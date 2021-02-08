import positionsTpl from '../../views/positions.art';
import positionListTpl from '../../views/positions-list.art';

import { auth as authModel } from '../../models/auth';
import { positionsList as positionListModel } from '../../models/poaitions-list';
import { positionRemove as positionRemoveModel } from '../../models/positions-remove';
import { positionsSearch as positionsSearchModel } from '../../models/positions-search';

import { addPosition } from '../../controllers/positions/add-position';
import { updatePosition } from '../../controllers/positions/update-position';

const _list = async() => {
  const listData = await positionListModel();
  $('#positions-list').html(positionListTpl({
    data: listData
  }));
  _methods();
};

const _search = async(positionName) => {
  let data = await positionsSearchModel({positionName});
  console.log(data)
  if(data.length > 0) {
    $('#positions-list').html(positionListTpl({
      data
    }));
  }
}

const _remove = async(id) => {

  const result = await positionRemoveModel(id);
  if(result) {
    _list();
  } else {
  }
};

const _methods = () => {
  $('#add-position-btn').on('click', addPosition);

  $('#positions-list').on('click', '#del-position-btn', function() {
    const id = $(this).data('id');
    _remove(id);
  });

  $('#search-position-btn').on('click', () => {
    const positionName = $('#search-input').val();
    _search(positionName);
  });

  $('#positions-list-box').on('click', '#update-btn', function() {
    const id = $(this).data('id');
    const dom = $(this).parent().parent().contents().filter('td');
    let data = {
      no: dom[0].innerText,
      positionName: dom[1].innerText,
      createDate: dom[2].innerText,
      staffNumber: dom[3].innerText.replace(/\s+/g,"").replace("人",""),
      description: dom[4].innerText
    };
    data.title = '更新信息';
    updatePosition(id, data);
  });
};

const _subscribe = () => {
  $('body').on('changeData', () => {
    _list();
  });
};

const listPosition = (router) => {
  return async(req, res, next) => {
    const result = await authModel();
    if(result) {
      const html = positionsTpl();
      next();
      res.render(html)
      _list();
      _subscribe();
    } else {
      router.go('/signin')
    }
  };
};

export default listPosition;