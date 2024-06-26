import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('authToken');

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response;
};

const getUser = async (payload) => {
  const response = await axios.post(`${API_URL}/api/mfind`, payload);
  return response;
};

// const addUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/add-user`, userData, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': token, // Use the token in the Authorization header
//     },
//   });
//   return response;
// };


const updateUser = async (payload) => {
  const response = await axios.put(`${API_URL}/api/update`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token, // Use the token in the Authorization header
    },
  });
  return response;
};

  const addUser = async (userData) => {
    console.log('ssa',userData);
    const response = await axios.post(`${API_URL}/api/user/add-user`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Use the token in the Authorization header
      },
    });
    console.log('dsdsd',response);
    return response;
  };
  const getData = async (payload) => {
    const response = await axios.post(API_URL+'/api/mfind',payload);
    return response;
  };
  // export default { register,login,addUser,getUser,getData };

  const deleteUser = async(payload) => {
    const response = await axios.put(`${API_URL}/api/delete`, payload, {
      headers: {
        'Content-Type' :'application/json',
        'Authorization': token,
      }
    })
    return response;
  }
  


export default { register, login, getUser, addUser, updateUser,getData, deleteUser };
