import http from '../../utils/http';

export const userList = async(userId) => {
  try {
    const { res } = await http({ 
      url: '/api/users/list'
    });
    return res.data;
  } catch(e) {
    console.log(e);
  }
};



