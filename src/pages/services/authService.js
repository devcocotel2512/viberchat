import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}/register`;

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response;
  };
  
  export default { register };

  