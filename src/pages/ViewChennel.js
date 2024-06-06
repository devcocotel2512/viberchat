import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import channelService from "./services/channelService";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BoldTableCell = styled(StyledTableCell)({
  fontWeight: "bold",
});

const Channel = () => {
  const { lbl } = useParams();
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const channelsPerPage = 10;

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
  }, [lbl]);

  const handleAddChannelClick = () => {
    navigate("/add-channel");
  };

  const EditChannel = (channelLbl) => {
    navigate(`/edit-channel/${channelLbl}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredChannels = channels.filter((channel) =>
    channel.nm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = filteredChannels.slice(
    indexOfFirstChannel,
    indexOfLastChannel
  );

  return (
    <Layout>
      <ToastContainer />
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
                <h2>Channel Details</h2>

                <div action="" className="search-bar">
                  <input
                    type="search"
                    placeholder="Search Here..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="search-btn" type="submit">
                    <span>Search</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary rounded"
                  onClick={handleAddChannelClick}
                >
                  Add Channel
                </button>
              </div>
              <div className="body">
                {loading ? (
                  <div className="loading-container">
                    <ClipLoader color={"#123abc"} loading={loading} size={50} />
                  </div>
                ) : (
                  <>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Sr.No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Label</StyledTableCell>
                            <StyledTableCell>Form</StyledTableCell>
                            <StyledTableCell align="center">
                              Action
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentChannels.map((channel, index) => (
                            <StyledTableRow key={index}>
                            <BoldTableCell>
                                {indexOfFirstChannel + index + 1}
                                </BoldTableCell>
                             <BoldTableCell>{channel.nm}</BoldTableCell>
                             <BoldTableCell>{channel.lbl}</BoldTableCell>
                              <BoldTableCell>{channel.frm}</BoldTableCell>
                              <StyledTableCell align="center">
                                <button
                                  type="button"
                                  className="btn-edit"
                                  onClick={() => EditChannel(channel.lbl)}
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button type="button" className="btn-delete">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination
                      count={Math.ceil(
                        filteredChannels.length / channelsPerPage
                      )}
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
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .search-container {
          display: flex;
          justify-content: flex-end;
        }
        .search-container input {
          max-width: 300px;
        }
      `}</style>
    </Layout>
  );
};

export default Channel;
