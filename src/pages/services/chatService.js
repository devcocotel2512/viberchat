import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem('authToken');
const sendChat = async (payload) => {
    // Retrieve the token from local storage
    const response = await axios.post(`${API_URL}/send-Chat`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Use the token in the Authorization header
        },
    });
    return response;
};

const getChat = async (payload) => {
    const response = await axios.post(API_URL+'/mfind',payload)
    return response;  
}

export default { sendChat, getChat};
