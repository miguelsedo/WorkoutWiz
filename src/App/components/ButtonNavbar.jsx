import { Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


export const ButtonNavbar = ({ to, text }) => {
  return (
    <Link component={RouterLink} to={to} className="typography-link" sx={{ textDecoration: 'none' }}>
      <Grid item>
        <Typography 
          variant='body1' 
          className="nice-typography" 
          style={{ color: '#ffffff' }}
          sx={{ml:8}}
        >
          {text}
          <span className="typography-line"></span>
        </Typography>
      </Grid>
    </Link>
  );
};

export default ButtonNavbar;
