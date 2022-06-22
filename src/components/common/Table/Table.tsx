import React, {useState} from 'react';
// Router hook
import {useNavigate} from 'react-router-dom';
// Material library imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Avatar, Grid, Typography } from '@mui/material';
// Data
import { tableHeading } from '../../../data/tableData';
// React Components
import StarIcon from '../StarIcon/StarIcon';
import ForkIcon from '../ForkIcon/ForkIcon';
  
// defining Type of props of table component
type TableProps = {
    apiData : any,
}
const TableComponent = ({apiData}:TableProps) => {
  const navigate = useNavigate();
  // Function to change route and navigate to it
  const goToRoute =(url:string, param:string | number = '')=>{
    let pageUrl =  url;
    if(param)
      pageUrl = `${url}/${param}`;
    navigate(pageUrl);
  }
  // Pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event:unknown , newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>
                <input type="checkbox" />
                </TableCell>
             {tableHeading.map((heading,index) => (
                <TableCell align="left" key={`_${index}`}>{heading}</TableCell>
              ))}
            </TableRow>
        </TableHead>
        <TableBody>
          {apiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row :any, index: number) => (
            <TableRow
               key={`${row?.name}_${index}`}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell onClick={() => goToRoute('/gist',row?.id)} align="left" style={{cursor: "pointer"}} >
                  <Grid container alignItems="center">
                  <Grid item lg={3}>
                  <Avatar src={row?.owner?.avatar_url} alt={row?.name} />
                  </Grid>
                  <Grid item lg={9}>
                  <Typography color = "gray">{row?.owner?.login}</Typography>
                  </Grid>
                  </Grid>
                  </TableCell>
                <TableCell>{row?.created_at.split("T")[0]}</TableCell>
                <TableCell>{row?.created_at.split("T")[1].split("Z")}</TableCell>
                <TableCell>{row?.owner?.node_id}</TableCell>
                <TableCell>{row?.owner?.login}</TableCell>
                <TableCell> 
                  <StarIcon id={row?.id} count={0} />
                  <ForkIcon id={row?.id} count={0} />
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
export default TableComponent;