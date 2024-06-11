import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { Person, PersonOutline, LogoutOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store';

const PerfilButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const onLogout = () => {
      dispatch( startLogout() );
  }

  const { displayName } = useSelector(state => state.auth);

  return (
    <>

      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleMenuOpen}
        sx={{
          color: '#ffffff',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: hovered ? '90%' : 0,
            height: '2px',
            backgroundColor: hovered ? '#ffffff' : 'transparent',
            transition: 'width 0.3s ease',
          },
        }}
        >

        {hovered ? <Person /> : <PersonOutline />}
    <Typography variant='h9' noWrap component='div' sx={{ ml: 1, mr:1 }}> {displayName} </Typography>

      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            '& .MuiMenuItem-root': {
              transition: 'background-color 0.4s ease',
            },
          },
        }}
        >
        <MenuItem
          component={RouterLink} to="/informacion-personal"
          onClick={handleMenuClose}
          sx={{
            color: '#7b00ff',
            '&:hover': {
              color: '#ffffff',
              backgroundColor: '#7b00ff',
            },
          }}
          >
          Información personal
        </MenuItem>
        <MenuItem
          onClick={onLogout}
          sx={{
            color: '#7b00ff',
            '&:hover': {
              color: '#ffffff',
              backgroundColor: '#7b00ff',
            },
          }}
          >
          <LogoutOutlined sx={{mr:2}}/>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default PerfilButton;
