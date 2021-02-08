/* 通过session鉴权 */
// const auth = (req, res, next) => {
//   if(req.session.username) {
//     next();
//   } else {
//     res.render('fail', {
//       data: JSON.stringify({
//         message: '请登录'
//       })
//     });
//   }
// };
/******************/

const { verify } = require('../utils/tools');
/* 通过token鉴权 */
const auth = (req, res, next) => {
  const token = req.get('X-Access-Token');
  try {
    const result = verify(token);
    next();
  } catch(e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录'
      })
    });
  }
};

exports.auth = auth;