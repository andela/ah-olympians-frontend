import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));

let userToken;
try {
  user = JSON.parse(localStorage.getItem('user'));
  const { token } = user.user;
  userToken = token;
} catch (err) {
	const error = err.message;
}


const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${userToken}`,
  },
};

export default axiosHeader;