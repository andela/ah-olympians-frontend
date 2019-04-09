let userToken = 'none';

try {
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user.user;
  userToken = token;
} catch (err) {}

const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${userToken}`,
  },
};

export default axiosHeader;
