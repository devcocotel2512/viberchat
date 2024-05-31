import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import authService from "./services/authService";
import Switch from '@mui/material/Switch';
import Pagination from '@mui/material/Pagination';

const ViewUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authService.getUser({
          searchquery: {
            _id: "raidlayer",
          },
          projection: {
            user: 1,
          },
          showcount: 1,
        });
        console.log("Response Data:", response.data);
        const usersData = response.data.data[0].user.map(user => ({
          ...user,
          verified: Boolean(user.verified)  // Ensure verified is a boolean
        }));
        console.log("Processed Users Data:", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddChannelClick = () => {
    navigate("/add-user");
  };

  const handleToggleVerified = async (index) => {
    const updatedUsers = [...users];
    const user = updatedUsers[index];
    user.verified = !user.verified;

    setUsers(updatedUsers);

    try {
      await authService.updateUser(user._id, { verified: user.verified });
    } catch (error) {
      console.error("Error updating user verification status:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12"></div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddChannelClick}
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header mb-3">
                    <h2>Users Details</h2>
                  </div>
                  <div className="body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left" }}>Sr.No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Verified</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.map((user, index) => (
                          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "inherit" }}>
                            <td style={{ textAlign: "left" }}>{indexOfFirstUser + index + 1}</td>
                            <td>{user.un}</td>
                            <td>{user.em}</td>
                            <td>
                              <Switch
                                checked={user.verified}
                                onChange={() => handleToggleVerified(indexOfFirstUser + index)}
                                color="primary"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      count={Math.ceil(users.length / usersPerPage)}
                      page={currentPage}
                      onChange={handleChangePage}
                      color="primary"
                      className="mt-3"
                    />
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

export default ViewUser;
