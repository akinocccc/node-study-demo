import signinTpl from '../views/signin.art';
import { signin as signinModel } from '../models/signin';

const htmlSignin = signinTpl({});

//登录页面提交表单处理方法
const _handleSubmit = (router) => {
  return async(e) => {
    e.preventDefault();
    const data = $('#signin').serialize();
    const { res, jqXHR } = await signinModel(data);
    const token = jqXHR.getResponseHeader('X-Access-Token')
    localStorage.setItem('AdminLTE-token', token)
    if(res.ret) {
      router.go('/index');
    }
  };
};

//管理员登录
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $('#submit').on('click', _handleSubmit(router));
  };
};

export default signin;