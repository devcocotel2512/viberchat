import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import channelService from "./services/channelService";

const ViewUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await channelService.getUser({
          searchquery: {
            _id: "raidlayer",
          },
          projection: {
            user: 1,
          },
          showcount: 1,
        });
        setUsers(response.data.data[0].user);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddChannelClick = () => {
    navigate("/add-user");
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          {/* Page header section */}
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12"></div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddChannelClick}
                >
                  Add-User
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
                    <table className="table table-bordered"> {/* Add border */}
                      <thead>
                        <tr>
                          <th style={{ textAlign: "right" }}>Sr.No</th> {/* Align right */}
                          <th>Name</th>
                          <th>Email</th>
                          <th>Verified</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "inherit" }}> {/* Optional: Alternating row color */}
                            <td style={{ textAlign: "right" }}>{index + 1}</td>
                            <td>{user.un}</td>
                            <td>{user.em}</td>
                            <td>{user.verified}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
