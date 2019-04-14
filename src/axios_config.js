const user = JSON.parse(localStorage.getItem('user'));
let userToken;
try {
  const { token } = user.user;
  userToken = token;
} catch (err) {
  userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNTYwNTk3Mzg0fQ.UPMuN8m1v7dGwda8Lqx0G6R3eLkkZUcNBuhBZTyDXRA';
}
const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${userToken}`,
  },
};

export default axiosHeader;
