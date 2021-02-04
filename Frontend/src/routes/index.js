/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 01:38:33
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 02:58:33
 * @FilePath: \lagou-admin-system\Frontend\src\routes\index.js
 */

import SMERouter from 'sme-router';

import { 
    signin,
    index,
  } from '../controllers';

const router = new SMERouter('root');

// router.route('/', index);
router.route('/signin', signin(router));
router.route('/index', index(router));


export default router;

