import http from '../../utils/http';

export const positionsList = async() => {
  try {
    const { res } = await http({ 
      url: '/api/positions/list'
    });
    return res.data;
  } catch(e) {
    console.log(e);
  }
};



