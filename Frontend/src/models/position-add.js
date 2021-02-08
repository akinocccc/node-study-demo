import http from '../../utils/http';

export const positionAdd = async(data) => {
  try {
    const { res } = await http({ 
      url: '/api/positions/add',
      type: 'post',
      data,
    });
    return res.ret;
  } catch(e) {
    console.log(e);
  }
};