/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-03 19:24:35
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 02:29:24
 * @FilePath: \lagou-admin-system\Frontend\src\app.js
 */
//载入css
import './assets/common.css';

//载入router
import router from './routes';

const hash = location.hash.slice(1);
router.go(hash);

