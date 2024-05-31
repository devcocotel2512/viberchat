import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Chennel = () => {
  const navigate = useNavigate();
  const [channelData, setChannelData] = useState(null); // State to store fetched channel data

  const handleAddChannelClick = () => {
    navigate("/add-channel"); // Use navigate to redirect on button click
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://135.181.146.84:8001/mfind', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            searchquery: {
              "_id": "<YOUR_CHANNEL_ID>", // Replace with your actual ID
            },
            projection: { "chnl": 1 },
            showcount: 1
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setChannelData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

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

          {channelData && ( // Conditionally render table only if data is available
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2>Channel Details</h2>
                  </div>
                  <div className="body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {channelData.chnl && ( // Check if "chnl" property exists before rendering
                          <tr>
                            <td>Channel Name</td>
                            <td>{channelData.id}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chennel;
