import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Main(props) {
  const { article, blogname } = props.blog;

  return (
    <>
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h4" gutterBottom sx={{mb:2}}>
        {blogname}
      </Typography>
      <Divider />
      <Typography variant="subtitle1" gutterBottom sx={{mt:2}}>
        {article}
      </Typography>
    </Grid>
    </>
    
  );
}

export default Main;
