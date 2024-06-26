import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import authService from "./services/authService";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrash } from "@fortawesome/free-solid-svg-icons";
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

const ViewUser = () => {
  const navigate = useNavigate();
  const { un } = useParams();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await authService.getUser({
          searchquery: {
            _id: "raidlayer",
            _un: un,
          },
          projection: {
            user: 1,
          },
          showcount: 1,
        });
        const usersData = response.data.data[0].user.map((user) => ({
          ...user,
          verified: Boolean(user.verified),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [un]);

  const handleAddUserClick = () => {
    navigate("/add-user");
  };

  const handleToggleVerified = async (index) => {
    const updatedUsers = [...users];
    const user = updatedUsers[index];
    user.verified = !user.verified;

    setUsers(updatedUsers);

    try {
      await authService.updateUser(user._id, { verified: user.verified });
    } catch (error) {
      console.error("Error updating user verification status:", error);
    }
  };

  const EditUser = (userUn) => {
    navigate(`/edit-user/${userUn}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDelete = async (userUn) => {
    try {
      setLoading(true);
      await authService.deleteUser({
        searchquery: {
          _id: "raidlayer",
          "user.un": userUn,
        },
        body: {
          "$pull": {
            "user": { "un": userUn }
          }
        }
      });
      toast.success("User deleted successfully");
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.un !== userUn)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.un.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
                <h2 className="text">User Details</h2>

                <div action="" className="search-bar">
                  <input
                    type="search"
                    placeholder="Search Here...."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <button className="search-btn" type="submit">
                    <span>Search</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary rounded"
                  onClick={handleAddUserClick}
                >
                  Add User
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
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="mr-12">
                              Verified
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Action
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentUsers.map((user, index) => (
                            <StyledTableRow key={index}>
                              <BoldTableCell>
                                {indexOfFirstUser + index + 1}
                              </BoldTableCell>
                              <BoldTableCell>{user.un}</BoldTableCell>
                              <BoldTableCell>{user.em}</BoldTableCell>
                              <StyledTableCell>
                                <button
                                  className={`btn2 ${
                                    user.verified
                                      ? "btn-success"
                                      : "btn-secondary"
                                  }`}
                                  onClick={() =>
                                    handleToggleVerified(
                                      indexOfFirstUser + index
                                    )
                                  }
                                >
                                  {user.verified ? "Active" : "Deactive"}
                                </button>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <button
                                  type="button"
                                  className="btn-edit"
                                  onClick={() => EditUser(user.un)}
                                >
                                  <FontAwesomeIcon icon={faUserPen} />
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  onClick={() => handleDelete(user.un)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination
                      count={Math.ceil(filteredUsers.length / usersPerPage)}
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
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
        .search-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default ViewUser;
