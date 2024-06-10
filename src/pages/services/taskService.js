import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem('authToken');
const addTask = async (payload) => {
    // Retrieve the token from local storage
    const response = await axios.post(`${API_URL}/api/task/add-task`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Use the token in the Authorization header
        },
    });
    return response;
};

const getTask = async (payload) => {
    const respose = await axios.post(`${API_URL}/api/mfind`, payload);
    return respose
}

const updateTask = async (payload) => {
    const response = await axios.put(`${API_URL}/api/update`, payload, {
    });
    return response;

  }

export default { addTask, getTask, updateTask};
