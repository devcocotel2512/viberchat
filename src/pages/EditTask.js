import React from "react";
import Layout from "../components/Layout";

const EditTask = () => {
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
                  <div className="header"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditTask;
