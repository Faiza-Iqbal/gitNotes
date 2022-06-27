// lib
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  TableContainer,
  TableHead,
  Grid,
  Typography,
  Paper,
  TablePagination,
} from "@mui/material";

// src
import StarIconComponent from "../StarIconComponent/StarIconComponent";
import ForkIcon from "../ForkIcon/ForkIcon";
import userContext from "../../../context/userContext";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import { tableHeading } from "../../../constants/tableData";

// utils
import { goToRoute } from "../../../utils/GenericFunctions";

// style
import "./ListLayout.css";

type ListLayoutProps = {
  apiData: any;
};

const ListLayout = ({ apiData }: ListLayoutProps) => {
  const navigate = useNavigate();
  const auth = useContext(userContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        className="styledTable"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead className="styledHead">
          <TableRow>
            <TableCell>
              <CustomCheckBox />
            </TableCell>
            {tableHeading.map((heading, index) => (
              <TableCell align="left" key={`_${index}`}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="styledTableBody">
          {apiData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any, index: number) => (
              <TableRow key={`${row?.name}_${index}`}>
                <TableCell>
                  <CustomCheckBox />
                </TableCell>
                <TableCell
                  onClick={() => navigate(goToRoute("/gist", row?.id))}
                  align="left"
                  style={{ cursor: "pointer" }}
                >
                  <Grid container alignItems="center">
                    <Grid item lg={3}>
                      <Avatar src={row?.owner?.avatar_url} alt={row?.name} />
                    </Grid>
                    <Grid item lg={9}>
                      <Typography color="gray">{row?.owner?.login}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row?.created_at.split("T")[0]}</TableCell>
                <TableCell>
                  {row?.created_at.split("T")[1].split("Z")}
                </TableCell>
                <TableCell>{row?.owner?.node_id}</TableCell>
                <TableCell>{row?.owner?.login}</TableCell>
                <TableCell>
                  <span>
                    <StarIconComponent id={row?.id} count={0} />
                    {row?.owner?.login !== auth?.user?.login && (
                      <ForkIcon id={row?.id} count={0} />
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={apiData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
export default ListLayout;
