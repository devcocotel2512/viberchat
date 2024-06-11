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

const TaskChat = async (payload) => {
    // Retrieve the token from local storage
    const response = await axios.post(`${API_URL}/api/task/task-chat`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Use the token in the Authorization header
        },
    });
    return response;
};



export default { addTask,TaskChat};
