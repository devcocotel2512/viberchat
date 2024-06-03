import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import authService from "./services/authService"; // Adjust the path as needed

const EditUser = () => {
  const { userun } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    un: "",
    em: "",
    pass: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getUser({
          searchquery: {
            _id: "raidlayer",
            "user.un": userun,
          },
          projection: {
            "user.$": 1,
          },
        });

        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0 &&
          response.data.data[0].user &&
          response.data.data[0].user.length > 0
        ) {
          const fetchedUser = response.data.data[0].user[0];
          setUserData({
            un: fetchedUser.un,
            em: fetchedUser.em,
            pass: fetchedUser.pass,
          });
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userun]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateUser({
        searchquery: {
          _id: "raidlayer",
          "user.un": userun,
        },
        body: {
          "user.$.un": userData.un,
          "user.$.em": userData.em,
          "user.$.pass": userData.pass,
        },
      });

      if (response.status === 200) {
        alert('User updated successfully'); 
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="em"
                          className="form-control"
                          value={userData.em}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          name="pass"
                          className="form-control"
                          value={userData.pass}
                          onChange={handleChange}
                        />
                      </div>
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
