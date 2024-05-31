import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import channelService from "./services/channelService";
import Pagination from "@mui/material/Pagination"; // Import Pagination component from MUI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Chennel = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const channelsPerPage = 10; // Number of channels per page

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await channelService.getChannel({
          searchquery: {
            _id: "raidlayer",
          },
          projection: {
            chnl: 1,
          },
          showcount: 1,
        });
        setChannels(response.data.data[0].chnl);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  const handleAddChannelClick = () => {
    navigate("/add-channel");
  };

  const handleEditChannelClick = (channelId) => {
    navigate(`/edit-channel/${channelId}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channels.slice(
    indexOfFirstChannel,
    indexOfLastChannel
  );

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
                  className="btn btn-primary theme-bg gradient"
                  onClick={handleAddChannelClick}
                >
                  Add Channel
                </button>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h2>Channel Details</h2>
                </div>
                <div className="body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left" }}>Sr.No</th>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Form</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChannels.map((channel, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "inherit",
                          }}
                        >
                          <td style={{ textAlign: "left" }}>
                            {indexOfFirstChannel + index + 1}
                          </td>
                          <td>{channel.nm}</td>
                          <td>{channel.lbl}</td>
                          <td>{channel.frm}</td>
                          <td className="flex">
                            <button
                              type="button"
                              className="btn btn-warning mr-2"
                              onClick={() =>
                                handleEditChannelClick(channel._id)
                              }
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() =>
                                handleEditChannelClick(channel._id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    count={Math.ceil(channels.length / channelsPerPage)}
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
    </Layout>
  );
};

export default Chennel;
