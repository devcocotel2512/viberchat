import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";


const TaskChat = () => {
    const { id } = useParams();

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="row clearfix mb-2">
            <div className="col-xl-5 col-md-5 col-sm-12"></div>
            <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs"></div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header d-flex justify-content-between align-items-center">
                <h2>Task Chating</h2>
                <div action="" className="search-bar">
                  <input type="search" placeholder="Search Here..." />
                  <button className="search-btn" type="submit">
                    <span>Search</span>
                  </button>
               
                </div>
              </div>
              <div className="body">
                This is chat

                <p><b>
                {id}
                </b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default TaskChat;
