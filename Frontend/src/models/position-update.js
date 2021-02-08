import http from '../../utils/http';

export const positionUpdate = async(data) => {
    await http({ 
      url: '/api/positions/update',
      type: 'post',
      data
    });
};