const { Positions } = require('../utils/db');

const findPosition = (no) => {
  return Positions.findOne({ no });
};

const removePosition = (positionId) => {
  return Positions.findByIdAndDelete(positionId);
};

const addPosition = ({ no, positionName, createDate, staffNumber, description }) => {
  const position = new Positions({
    no,
    positionName,
    createDate,
    staffNumber,
    description
  });
  return position.save();
};

const findList = () => {
  return Positions.find().sort({ no: -1 });
};

const updatePosition = (conditions, updateObj) => {
  return Positions.findByIdAndUpdate(conditions, updateObj);
};

const search = (positionName) => {
  return Positions.find(positionName);
}

exports.addPosition = addPosition;
exports.findPosition = findPosition;
exports.findList = findList;
exports.removePosition = removePosition;
exports.updatePosition = updatePosition;
exports.search = search;