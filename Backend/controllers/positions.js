const positionsModel = require('../models/positions');

const addPosition = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8');
  const { no, positionName, createDate, staffNumber, description } = req.body;
  const result = await positionsModel.findPosition(no);
  if(result) {
    res.render('fail', {
      data: JSON.stringify ({
        message: '职位已存在'
      })
    });
  } else {
    //数据库没有该职位，添加职位
    await positionsModel.addPosition({
      no, 
      positionName, 
      createDate, 
      staffNumber, 
      description
    })
    res.render('succ', {
      data: JSON.stringify({
        message: '添加成功！'
      })
    });
  }
};

const removePosition = async(req, res) => {
  const { id } = req.body;
  if(id.length === 24) {
    const result = await positionsModel.removePosition(id);
    if(result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '删除成功！'
        })
      });
    } else {
      res.render('fail', {
        data: JSON.stringify ({
          message: '删除失败'
        })
      });
    }
  } else {
    res.render('fail', {
        data: JSON.stringify ({
          message: '删除失败'
        })
    });
  }
  
};

const listPositions = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8');
  const result = await positionsModel.findList();
  if(result) {
    res.render('succ', {
      data: JSON.stringify(result)
    });
  }else {
    res.render('fail', {
      message: '查询失败'
    });
  }
};

const updatePosition = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8');
  const { id, no, positionName, createDate, staffNumber, description } = req.body;
  const result = await positionsModel.updatePosition({_id: id}, { no, positionName, createDate, staffNumber, description });
  console.log(result)
  if(result) {
    res.render('succ', {
        data: '更新成功！'
    });
  } else {
    res.render('fail', {
      message: '更新失败'
    });
  }
};

const searchPosition = async(req, res) => {
  res.set('content-type', 'application/json; charset=utf-8');
  const url = require('url')
  const positionName = url.parse(req.url, true).query;
  console.log(positionName)
  const result = await positionsModel.search(positionName);
  if(result) {
    res.render('succ', {
      data: JSON.stringify(result)
    });
  }else {
    res.render('fail', {
      message: '查询失败'
    });
  }
};

exports.addPosition = addPosition;
exports.removePosition = removePosition;
exports.listPositions = listPositions;
exports.updatePosition = updatePosition;
exports.searchPosition = searchPosition;