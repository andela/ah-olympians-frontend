const currentUser = localStorage.getItem('user') || '';
const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: currentUser.token,
  },
};

export default axiosHeader;
