/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 15:06:41
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 15:18:22
 * @FilePath: \AdminLte\Backend\utils\tools.js
 */
const bcrypt = require('bcrypt');

//hash加密
exports.hash = (myPlaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
      if(err) {
        reject(err);
      } 
      resolve(hash);
    });
  })
};

//hash比较
exports.compare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
      if(err) {
        reject(err);
      }
      resolve(result);
    });
  });
};