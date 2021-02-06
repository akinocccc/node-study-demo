/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 01:38:33
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 02:58:33
 * @FilePath: \lagou-admin-system\Frontend\src\routes\index.js
 */

//import SMERouter from 'sme-router';
import GP21Router from 'gp21-router';

import index from '../controllers/index';
import listUser from '../controllers/users/list-user';
import listPosition from '../controllers/positions/list-position';
import signin from '../controllers/signin';
import { auth as authModel} from '../models/auth';

const router = new GP21Router('root');

//路由守卫
router.use(async (req) => {
  const result = await authModel();
  if(result.ret) {
    router.go(req.url);
  } else {
    router.go('/signin');
  }
});

router.route('/signin', signin(router));
router.route('/index', index(router));
router.route('/index/users', listUser(router));
router.route('/index/positions', listPosition(router));

router.route('*', (req, res, next) => {
  console.log(1)
  res.redirect('/index/users');
});


export default router;

