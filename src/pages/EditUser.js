import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import authService from './services/authService';

const EditUser = () => {
  const { userun } = useParams();
  const [userData, setUserData] = useState({
    un: '',
    em: '',
    pass: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getUser({
          searchquery: {
            _id: "raidlayer",
          },
          projection: {
            user: 1
          },
           showcount: 1,
        });

        if (response.data && response.data.data && response.data.data.length > 0) {
          const user = response.data.data[0].user[0];
          setUserData({
            un: user.un,
            em: user.em,
            pass: user.pass
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateUser({
        searchquery: { _id: "raidlayer" }, // Assuming _id is raidlayer, adjust if necessary
        updateData: { 
          user: [
            {
              un: userData.un,
              em: userData.em,
              pass: userData.pass
            }
          ]
        }
      });
      if (response.data && response.data.success) {
        console.log('User data updated successfully');
        // You can also redirect or give feedback to the user here
      } else {
        console.error('Error updating user data:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12"></div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs"></div>
            </div>
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2>Edit User: {userun}</h2>
                  </div>
                  <div className="body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          name="un"
                          className="form-control"
                          value={userData.un}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="em"
                          className="form-control"
                          value={userData.em}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          name="pass"
                          className="form-control"
                          value={userData.pass}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Add other fields as necessary */}
                      <button type="submit" className="btn btn-primary mt-4">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
