import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const register = async (userData) => {
    const response = await axios.post(API_URL+'/register', userData);
    return response;
  };
  const login = async (userData) => {
    const response = await axios.post(API_URL+'/login', userData);
    return response;
  };

  const getUser = async (payload) => {
    const response = await axios.post(API_URL+'/mfind',payload);
    return response;
  };

  
  export default { register,login,getUser};
