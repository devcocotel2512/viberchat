import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import channelService from "./services/channelService";

const EditChannel = () => {
  const { channelLbl } = useParams();
  const [channelData, setChannelData] = useState({
    name: "",
    label: "",
    form: "",
    type: "",
    authkey: "",
  });

  useEffect(() => {
    const fetchChannelData = async () => {
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
        const channel = response.data.data[0].chnl.find(
          (ch) => ch.lbl === channelLbl
        );
        if (channel) {
          setChannelData({
            name: channel.nm,
            label: channel.lbl,
            form: channel.frm,
            type: channel.type,
            authkey: channel.authkey,
          });
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChannelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
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
                    <h2>Edit Channel: </h2>
                  </div>
                  <div className="body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={channelData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Label</label>
                        <input
                          type="text"
                          name="label"
                          className="form-control"
                          value={channelData.label}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Form</label>
                        <input
                          type="text"
                          name="form"
                          className="form-control"
                          value={channelData.form}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>type</label>
                        <input
                          type="text"
                          name="form"
                          className="form-control"
                          value={channelData.type}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Auth-Key</label>
                        <input
                          type="text"
                          name="form"
                          className="form-control"
                          value={channelData.authkey}
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

export default EditChannel;
