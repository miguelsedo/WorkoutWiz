// AppLayout.js
import React, { useContext, useEffect, useState } from 'react';
import { Box, Toolbar, Snackbar } from "@mui/material";
import { NavBar } from "../components";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks';

export const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userData, isLoading } = useContext(UserContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!isLoading && (!userData || !userData.Nombre || !userData.Apellidos || !userData.Edad || !userData.Altura || !userData.Peso)) {
      navigate('/informacion-personal');
      setOpenSnackbar(true);

    }

  }, [userData, isLoading, navigate]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box className="diapo"
    sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'radial-gradient(circle, #4B0082, #000000)'}}>
        <NavBar/>
        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />
            { children }
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Complete the user information to continue"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              sx={{
                '.MuiSnackbarContent-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  fontSize: '1rem',
                }
              }}
            />
        </Box>
    </Box>
  );
};

