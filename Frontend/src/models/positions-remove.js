import http from '../../utils/http';

export const positionRemove = async(id) => {
  try {
    const { res } = await http({ 
      url: '/api/positions/remove',
      type: 'delete',
      data: {
        id,
      },
    });
    return res.ret;
  } catch(e) {
    console.log(e);
  }
};

