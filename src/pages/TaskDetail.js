import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ClipLoader from "react-spinners/ClipLoader";
import chatService from "./services/chatService"; // Corrected import
import taskService from "./services/taskService"; // Corrected import

import { useNavigate, useParams } from "react-router-dom";

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

const TaskDetail = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const viewChat = (taskid) => {
    navigate(`/chat/${taskid}`);
  };
  useEffect(() => {
    const fetchTask = async () => {
      try {

        setLoading(true); // Set loading state to true when fetching data
        const response = await taskService.getTask({

          searchqurey: {
            _id: _id,
          },
          projection: {
            task: 1,
          },
          showcount: 1,
        });
        setTasks(response.data.data[0].task || []);
      } catch (error) {
        console.log("error fetching task", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };
    fetchTask();
  }, [_id]);

  const EditTask = (_id) => {
    navigate(`/edit-task/${_id}`);
  };


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
                <h2>Task Details</h2>
                <div action="" className="search-bar">
                  <input type="search" placeholder="Search Here..." />
                  <button className="search-btn" type="submit">
                    <span>Search</span>
                  </button>
                  {/* <button type="button" className="btn btn-primary rounded">
                    Add Task
                  </button> */}
                </div>
              </div>
              <div className="body">
                {loading ? ( // Display loading indicator if loading state is true
                  <div className="loading-container">
                  <ClipLoader color={"#123abc"} loading={loading} size={50} />
                  </div>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Sr.No</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Label</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell>Task-Of-User</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.map((task, index) => (
                          <StyledTableRow key={index}>
                            <BoldTableCell>{index + 1}</BoldTableCell>
                            <BoldTableCell>{task.name}</BoldTableCell>
                            <BoldTableCell>{task.label}</BoldTableCell>
                            <BoldTableCell>{task.status}</BoldTableCell>
                            <BoldTableCell>{task.taskOfUser}</BoldTableCell>
                            <StyledTableCell align="center">
                              <button  type="button"
                                  className="btn-edit"
                                  onClick={() => EditTask(task._id)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                              <button type="button" className="btn-eye" onClick={() => viewChat(task._id || '')}>
                                <FontAwesomeIcon icon={faEye} />
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

export default TaskDetail;
