import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import authService from "./services/authService";
import Switch from "@mui/material/Switch";
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

const ViewUser = () => {
  const navigate = useNavigate();
  const { un } = useParams();
  const [users, setUsers] = useState([]);
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
                  onClick={handleAddUserClick}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h2>Users Details</h2>
                </div>
                <div className="body">
                  {loading ? (
                    <div className="loading-container">
                      <ClipLoader color={"#123abc"} loading={loading} size={50} />
                    </div>
                  ) : (
                    <>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Sr.No</StyledTableCell>
                              <StyledTableCell>Name</StyledTableCell>
                              <StyledTableCell>Email</StyledTableCell>
                              <StyledTableCell>Verified</StyledTableCell>
                              <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentUsers.map((user, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell>
                                  {indexOfFirstUser + index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{user.un}</StyledTableCell>
                                <StyledTableCell>{user.em}</StyledTableCell>
                                <StyledTableCell>
                                  <Switch
                                    checked={user.verified}
                                    onChange={() => handleToggleVerified(indexOfFirstUser + index)}
                                    color="primary"
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <button
                                    type="button"
                                    className="btn-edit"
                                    onClick={() => EditUser(user.un)}
                                  >
                                    <FontAwesomeIcon icon={faUserPen} />
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
                        count={Math.ceil(users.length / usersPerPage)}
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

export default ViewUser;
