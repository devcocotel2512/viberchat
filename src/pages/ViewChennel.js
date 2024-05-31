import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chennel = () => {
  const navigate = useNavigate();
  const [datalist, setDataList] = useState([]);
  const handleAddChannelClick = () => {
    navigate("/add-channel"); // Use navigate to redirect on button click
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://135.181.146.84:8001/mfind");
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
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
                  Add-Chennel
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
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>Lable</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datalist.map((data, index) => (
                        <tr key={data._id}>
                          <td>{index + 1}</td>
                          <td>{data.lbl}</td>
                          <td>{data.type}</td>
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
