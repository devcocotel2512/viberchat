import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ViewChennel = () => {
  const navigate = useNavigate(); // Create a useNavigate instance

  const handleAddChannelClick = () => {
    navigate("/add-channel"); // Use navigate to redirect on button click
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          {/* Page header section */}
          <div className="block-header">
            <div className="row clearfix">
              <div className="col-xl-5 col-md-5 col-sm-12">
                <h1>Hi, Welcomeback!</h1>
                <span>JustDo Chat App,</span>
              </div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                <button
                  type="button" // Change type to "button" for click event
                  className="btn btn-primary theme-bg gradient"
                  onClick={handleAddChannelClick} // Add onClick handler
                >
                  Add-Chennel
                </button>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2>Hello</h2>
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

export default ViewChennel;
