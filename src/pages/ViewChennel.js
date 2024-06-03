import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import channelService from "./services/channelService";
import Pagination from "@mui/material/Pagination"; // Import Pagination component from MUI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

const Chennel = () => {
  const { lbl } = useParams();
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const channelsPerPage = 10; // Number of channels per page

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const response = await channelService.getChannel({
          searchquery: {
            _id: "raidlayer",
            _lbl: lbl,
          },
          projection: {
            chnl: 1,
          },
          showcount: 1,
        });
        setChannels(response.data.data[0].chnl);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [lbl]); // Adding lbl as a dependency to refetch when it changes

  const handleAddChannelClick = () => {
    navigate("/add-channel");
  };

  const EditChannel = (channelLbl) => {
    navigate(`/edit-channel/${channelLbl}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channels.slice(indexOfFirstChannel, indexOfLastChannel);

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
                  className="btn btn-primary rounded"
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
                  {loading ? (
                    <div className="loading-container">
                      <ClipLoader color={"#123abc"} loading={loading} size={50} />
                    </div>
                  ) : (
                    <>
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
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "inherit",
                              }}
                            >
                              <td style={{ textAlign: "left" }}>
                                {indexOfFirstChannel + index + 1}
                              </td>
                              <td>{channel.nm}</td>
                              <td>{channel.lbl}</td>
                              <td>{channel.frm}</td>
                              <td className="">
                                <button
                                  type="button"
                                  className="btn-edit"
                                  onClick={() => EditChannel(channel.lbl)} // Pass the label directly
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  // Add onClick for delete action if needed
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Chennel;
