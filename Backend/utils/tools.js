/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 15:06:41
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 15:18:22
 * @FilePath: \AdminLte\Backend\utils\tools.js
 */
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

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

exports.sign = (username) => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
  const token = jwt.sign({username}, privateKey, { algorithm: 'RS256' });
  return token;
};

exports.verify = (token) => {
  const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
  const result = jwt.verify(token, publicKey);
  return result;
};

//生成RSA公私钥对
exports.createRSAPem = (targrtPath, RSALength) => {
  const key = new NodeRSA({ b: RSALength });
  var publicDer = key.exportKey('pkcs1-public-pem'); //公钥
  var privateDer = key.exportKey('pkcs1-private-pem');//私钥
  fs.writeFileSync(targrtPath, privateDer);
  fs.writeFileSync(targrtPath, publicDer);
}