import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem('authToken');
const addChannel = async (payload) => {
   // Retrieve the token from local storage
  const response = await axios.post(`${API_URL}/add-channel`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, // Use the token in the Authorization header
    },
  });
  return response;
};

  const getChannel = async (payload) => {
    const response = await axios.post(API_URL+'/mfind',payload);
    return response;
  };

  
  

 
  
  export default { addChannel,getChannel};
