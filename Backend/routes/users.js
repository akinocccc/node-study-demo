/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 12:50:10
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 13:48:44
 * @FilePath: \AdminLte\Backend\routes\users.js
 */
var express = require('express');
var router = express.Router();

const { signup, signin, list, remove } = require('../controllers/users');

/* GET users listing. */
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/list', list);
router.delete('/remove', remove);

module.exports = router;
