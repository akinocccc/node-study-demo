/*
 * @Description: 数据库操作
 * @Author: AS
 * @Date: 2021-02-04 14:17:11
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 14:51:53
 * @FilePath: \AdminLte\Backend\utils\db.js
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/AdminLTE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//构建users的model
var usersSchema = mongoose.Schema({
  username: String,
  password: String
});

var Users = mongoose.model('users', usersSchema);

exports.Users = Users;