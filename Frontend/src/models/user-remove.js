import http from '../../utils/http';

export const userRemove = async(userId) => {
  try {
    const { res } = await http({ 
      url: '/api/users/remove',
      type: 'delete',
      data: {
        userId,
      },
    });
    return res.ret;
  } catch(e) {
    console.log(e);
  }
};

