import React from 'react';
import { AppBar, Grid, Toolbar } from '@mui/material';
import ButtonNavbar from './ButtonNavbar';
import PerfilButton from './ButtonPerfil';
import { Link as RouterLink } from 'react-router-dom';
import wwlogo from './images/wwlogo.png';
import hoverwwlogo from './images/hoverwwlogo.png';

export const NavBar = ({ drawerWidth = 240 }) => {

  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'transparent', boxShadow: 'none', backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)'}}>
      <Toolbar sx={{transition: 'background-color 0.5s ease'}}>
        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
          {/* Logo Grid */}
          <Grid item sx={{ display: 'flex', alignItems: 'center'}}>
            <RouterLink to='/' style={{ position: 'relative', display: 'inline-block', height: '50px', width: '50px', textDecoration: 'none' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: '100%',
                  backgroundImage: `url(${wwlogo})`, 
                  backgroundSize: 'cover',
                  transition: 'background-image 0.3s ease-in-out' 
                }} 
                onMouseOver={e => e.currentTarget.style.backgroundImage = `url(${hoverwwlogo})`} 
                onMouseOut={e => e.currentTarget.style.backgroundImage = `url(${wwlogo})`} 
              />
            </RouterLink>
            <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
              <ButtonNavbar to="/routine-creator" text="CREA TU RUTINA" />
              {/* <ButtonNavbar to="/modificar-rutinas" text=x"MODIFICA" /> */}
              <ButtonNavbar to="/rutinas-guardadas" text="RUTINAS GUARDADAS" />
            </Grid>
          </Grid>


          {/* Profile Button */}
          <Grid item >
            <PerfilButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

