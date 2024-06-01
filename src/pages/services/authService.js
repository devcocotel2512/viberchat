import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem('authToken');
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

  
  

  const addUser = async (userData) => {
    console.log('ssa',userData);
    const response = await axios.post(`${API_URL}/add-user`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Use the token in the Authorization header
      },
    });
    console.log('dsdsd',response);
    return response;
  };

  const updateUser = async(payload) => {
    const responce = await axios.post(API_URL+'/api/updateUser', payload)
   return responce
  };
  
  
  export default { register,login,addUser,getUser,updateUser};

