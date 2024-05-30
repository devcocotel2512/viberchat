import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const addChannel = async (payload) => {
  const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
  const response = await axios.post(`${API_URL}/add-channel`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, // Use the token in the Authorization header
    },
  });
  return response;
};

  const getChannel = async () => {
    const response = await axios.get(API_URL+'/channel');
    return response;
  };
  
  export default { addChannel,getChannel };
