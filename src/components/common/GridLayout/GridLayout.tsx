// lib
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Avatar,
  Typography,
  Box,
  Paper,
  Grid,
  TablePagination,
} from "@mui/material";

// src
import ViewFileContent from "../ViewFileContent/ViewFileContent";

// utils
import { goToRoute, showDateInDays } from "../../../utils/GenericFunctions";

type GridLayoutProps = {
  apiData: any;
};

const GridLayout = ({ apiData }: GridLayoutProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

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
    <>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
        >
          {apiData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((apiItem: any, index: number) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <Item onClick={() => navigate(goToRoute("/gist", apiItem?.id))}>
                  <ViewFileContent
                    file={
                      apiItem.files[Object.keys(apiItem?.files)[0]]?.raw_url
                    }
                  />
                  <hr></hr>
                  <Grid container alignItems="center">
                    <Grid item lg={2}>
                      <Avatar
                        src={apiItem?.owner?.avatar_url}
                        alt={apiItem?.name}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography style={{ color: "blue", fontSize: "12px" }}>
                        {apiItem?.owner?.login} /
                        {Object.keys(apiItem?.files)[0].substring(0, 20)}
                      </Typography>
                      <Typography style={{ color: "gray", fontSize: "10px" }}>
                        Created {showDateInDays(apiItem?.created_at)}
                      </Typography>
                      <Typography style={{ color: "gray", fontSize: "10px" }}>
                        Broadcast Server
                      </Typography>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={apiData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: 300,
  cursor: "pointer",
}));

export default GridLayout;
