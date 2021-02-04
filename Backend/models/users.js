/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 14:32:39
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 15:02:12
 * @FilePath: \AdminLte\Backend\models\users.js
 */

const { Users } = require('../utils/db');

const findUser = (username) => {
  return Users.findOne({ username });
};

const removeUser = (userId) => {
  return Users.findByIdAndDelete(userId);
};

const signup = ({username, password}) => {
  const user = new Users({
    username,
    password
  });
  return user.save();
};

const findList = () => {
  return Users.find().sort({ _id: -1 });
};

exports.signup = signup;
exports.findUser = findUser;
exports.findList = findList;
exports.removeUser = removeUser;