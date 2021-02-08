import http from '../../utils/http';

export const userAdd = async(data) => {
  try {
    const { res } = await http({ 
      url: '/api/users/signup',
      type: 'post',
      data,
    });
    return res.ret;
  } catch(e) {
    console.log(e);
  }
};