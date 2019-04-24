let userToken;
try {
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user.user;
  userToken = token;
} catch (err) {
  userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsImV4cCI6MTU2MDc5MDQwMX0.IiKq2Fzbuhu424D3xBQrdSkZKzVx46bkALCgE4B4NaA';
}
const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${userToken}`,
  },
};

export default axiosHeader;
