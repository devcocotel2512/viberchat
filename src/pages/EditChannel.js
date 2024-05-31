import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const EditChannel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default to an empty object if location.state is null or undefined
  const { channel } = location.state || {};

  // If channel is not defined, redirect to a different page (e.g., a 404 page or channels list)
  if (!channel) {
    navigate('/channels'); // Replace with the appropriate route
    return null;
  }

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
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs"></div>
            </div>
          </div>

          {/* Channel data section */}
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h2>Edit Channel: {channel.nm}</h2>
                </div>
                <div className="body">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" defaultValue={channel.nm} />
                    </div>
                    <div className="form-group">
                      <label>Label</label>
                      <input type="text" className="form-control" defaultValue={channel.lbl} />
                    </div>
                    <div className="form-group">
                      <label>Form</label>
                      <input type="text" className="form-control" defaultValue={channel.frm} />
                    </div>
                    {/* Add other fields as necessary */}
                  </form>
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
