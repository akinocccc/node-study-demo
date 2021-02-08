import http from '../../utils/http';

export const positionsSearch = async(data) => {
  try {
    const { res } = await http({ 
      url: '/api/positions/search',
      data
    });
    return res.data;
  } catch(e) {
    console.log(e);
  }
};



