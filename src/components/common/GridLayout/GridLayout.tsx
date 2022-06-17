import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from '@mui/material';
type GridProps = {
    apiData : any;
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 300,
  }));
const GridLayout = ({apiData} : GridProps) =>{
  // fetch('https://gist.githubusercontent.com/mboo2005/d0fe8232a4abfe689a903d311bf4b33d/raw/422c3bfcb5e0147aca84d19437b0de8d003d6583/m3u8-to-mp4.md') 
  // .then(response => response.text())
  // .then(result => console.log("result fetch md file",result));
    const showDateInDays = (created_at_date: string) : string => {
        let timeString : string = "";
        let totalMilliSeconds : number = +new Date() - +new Date(created_at_date);
        let timeAgo : number = Math.floor(totalMilliSeconds / 86400000 );
        if(timeAgo > 0)
            return timeString+= `${timeAgo} days ago`;
        timeAgo = Math.floor(totalMilliSeconds / (60 * 60 * 1000));
        if(timeAgo > 0)
            return timeString+= `${timeAgo} hours ago`;
        timeAgo = Math.floor(totalMilliSeconds / (60 * 1000));
            return timeString+= `${timeAgo} minutes ago`;
    }
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {apiData.map((apiItem : any, index:number) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Typography color = "black">{apiItem?.owner?.avatar_url}</Typography>
                <Typography color = "black">{apiItem?.owner?.avatar_url}</Typography>
                <Typography color = "black">{apiItem?.owner?.avatar_url}</Typography>
                <Typography color = "black">{apiItem?.owner?.avatar_url}</Typography>
              <hr></hr>
              <Grid container alignItems="center">
                  <Grid item lg={2}>
                  <Avatar src={apiItem?.owner?.avatar_url} alt={apiItem?.name} />
                  </Grid>
                  <Grid item lg={10}>
                  <Typography color = "blue">{apiItem?.owner?.login} / {Object.keys(apiItem?.files)[0]}</Typography>
              <Typography color = "gray">Created {showDateInDays(apiItem?.created_at)} </Typography> 
              <p style={{color: "gray", fontSize: "10px"}}>Broadcast Server </p> 
                  </Grid>
                  </Grid>
                  </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );

}
export default GridLayout;