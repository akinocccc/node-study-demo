const http = ({
  url = '/api/users/isAuth',
  type = 'get',
  data = {},
}) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      dataType: 'json',
      type,
      data,
      headers: {
        'X-Access-Token': localStorage.getItem('AdminLTE-token') || ''
      },
      success( res, textStatus, jqXHR) {
        resolve({
          res,
          textStatus,
          jqXHR
        });
      },
      error(err) {
        reject(err.message);
      }
    });
  }).catch(e => {  })
};

export default http;