import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import chatService, { getTask } from "./services/chatService"; // Corrected import
import { useParams } from "react-router-dom";

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
  const { _id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await chatService.getTask({
          searchqurey: {
            _id: "raidlayer",
            _id: _id,
          },
          projection: {
            task: 1,
          },
          showcount: 1,
        });
        setTasks(response.data.data[0].task);
      } catch (error) {
        console.log("error fatching task", error);
      }
    };
    fetchTask();
  }, [_id]);

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
                            <button type="button" className="btn-edit">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .search-bar input {
          max-width: 300px;
        }
      `}</style>
    </Layout>
  );
};

export default TaskDetail;
