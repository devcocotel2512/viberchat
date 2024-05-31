import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewUser = () => {
  const navigate = useNavigate(); // Create a useNavigate instance
  const handleAddChannelClick = () => {
    navigate("/add-user"); // Use navigate to redirect on button click
  };
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          {/* Page header section */}
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12"></div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                <button
                  type="button" // Change type to "button" for click event
                  className="btn btn-primary"
                  onClick={handleAddChannelClick} // Add onClick handler
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header mb-3">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Dessert (100g serving)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Calories
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Fat&nbsp;(g)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Carbs&nbsp;(g)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Protein&nbsp;(g)
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.calories}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.fat}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.carbs}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.protein}
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
        </div>
      </div>
    </Layout>
  );
};

export default ViewUser;
