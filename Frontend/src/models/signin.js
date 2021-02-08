import http from '../../utils/http';

export const signin = async(data) => {
  try {
    const { res, jqXHR } = await http({ 
      url: '/api/users/signin',
      type: 'post',
      data
    });
    return {
      res,
      jqXHR
    };
  } catch(e) {
    console.log(e);
  }
};