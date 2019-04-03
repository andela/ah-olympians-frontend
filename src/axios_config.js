const token = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNTYwMjQ1Njc5fQ.uhC7-2XzzkD_7hJztodZay79MOCgmINxrUEwGdPmRvM' || '';
const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};

export default axiosHeader;
