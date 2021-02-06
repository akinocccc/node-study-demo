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

const { signup, signin, signout, list, remove, isAuth } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
router.post('/signup', auth, signup);
router.post('/signin', signin);
router.get('/signout', auth,  signout);

router.get('/list', auth, list);
router.delete('/remove', auth, remove);

router.get('/isAuth', isAuth);


module.exports = router;
