import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import channelService from "./services/channelService";

const Chennel = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleChannelSelection = (event) => {
    setSelectedChannel(event.target.value);
  };

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
        }); // Replace '/channels' with your actual API endpoint
        setChannels(response.data.data[0].chnl);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  const handleAddChannelClick = () => {
    navigate("/add-channel"); // Use navigate to redirect on button click
  };

  const handleEditChannelClick = (channelId) => {
    navigate(`/edit-channel/${channelId}`); // Redirect to edit channel page with channel ID
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          {/* Page header section */}
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12">
                {/* Content here */}
              </div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                <button
                  type="button" // Change type to "button" for click event
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
                        <th>Lable</th>
                        <th>Form</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channels.map((channel, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "inherit" }}>
                          <td style={{ textAlign: "left" }}>{index + 1}</td>
                          <td>{channel.nm}</td>
                          <td>{channel.lbl}</td>
                          <td>{channel.frm}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary theme-bg gradient"
                              onClick={() => handleEditChannelClick(channel._id)} // Assuming each channel has an _id property
                            >
                              Edit
                            </button>
                          </td>
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
    </Layout>
  );
};

export default Chennel;
