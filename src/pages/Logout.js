import React, { useState, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    localStorage.removeItem('authToken');


    navigate('/');
    window.location.href = '/';

    return (
        <></>
    );
}

export default Logout;
