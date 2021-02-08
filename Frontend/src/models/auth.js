import http from '../../utils/http';

export const auth = async() => {
  try {
    const { res } = await http({ 
      url: '/api/users/isAuth'
    });
    return res;
  } catch(e) {
    console.log(e);
  }
};