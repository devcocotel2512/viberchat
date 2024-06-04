import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import channelService from "./services/channelService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditChannel = () => {
  const navigate = useNavigate();
  const { channelLbl } = useParams();
  const [channelData, setChannelData] = useState({
    name: "",
    label: "",
    form: "",
    type: "",
    authkey: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await channelService.getChannel({
          searchquery: {
            _id: "raidlayer",
            "chnl.lbl": channelLbl,
          },
          projection: {
            "chnl.$": 1,
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
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelLbl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await channelService.updateChannel({
        searchquery: {
          _id: "raidlayer",
          "chnl.lbl": channelLbl,
        },
        body: {
          "chnl.$.nm": channelData.name,
          "chnl.$.lbl": channelData.label,
          "chnl.$.frm": channelData.form,
          "chnl.$.type": channelData.type,
          "chnl.$.authkey": channelData.authkey,
        },
      });
      toast.success("Channel updated successfully");
    } catch (error) {
      console.error("Error updating channel:", error);
      toast.error("Failed to update channel");
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    navigate("/channel");
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
                    <h2>Edit Channel:</h2>
                  </div>
                  <div className="body">
                    {loading ? (
                      <div className="loading-container">
                        <ClipLoader
                          color={"#123abc"}
                          loading={loading}
                          size={50}
                        />
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={channelData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Label</label>
                          <input
                            type="text"
                            name="label"
                            className="form-control"
                            value={channelData.label}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Form</label>
                          <input
                            type="text"
                            name="form"
                            className="form-control"
                            value={channelData.form}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Type</label>
                          <input
                            type="text"
                            name="type"
                            className="form-control"
                            value={channelData.type}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Auth-Key</label>
                          <input
                            type="text"
                            name="authkey"
                            className="form-control"
                            value={channelData.authkey}
                            onChange={handleChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mt-4 rounded "
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-class mt-4 ml-3 rounded "
                          onClick={back}
                        >
                          Back
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </Layout>
  );
};

export default EditChannel;
