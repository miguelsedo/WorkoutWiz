import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import { AppLayout } from '../layout/AppLayout';
import CustomCard from '../../ui/components/card/card';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RutinasGuardadas = () => {
  const [routines, setRoutines] = useState([]);
  const userId = useSelector(state => state.auth.uid);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    fetch(`https://api.workoutwiz.eu/routines/${userId}`)
      .then(response => response.json())
      .then(data => {
        setRoutines(data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching routines:", error));
      setLoading(false);
  }, [userId]);

  const handleRoutineClick = (id) => {
    console.log("Clicked Routine ID:", id);
  };

  return (
    <AppLayout>
      <Box
        className="animate__animated animate__fadeIn"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          sx={{ color: '#FFF', textAlign: 'center', mb: 4 }}
        >
          Your training plans
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 3} justifyContent="center">
          {routines.map((routine) => (
            <Grid item key={routine.id}>
              <Link 
                component={RouterLink} 
                to={`/rutina/${routine.id}/${userId}`} 
                style={{ textDecoration: 'none' }} 
                onClick={() => handleRoutineClick(routine.id)}
              >
                <CustomCard
                  firstContent={
                    <Typography
                      variant={isSmallScreen ? "h5" : "h4"}
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '1.5',
                        wordWrap: 'break-word'
                      }}
                    >
                      {routine.titulo}
                    </Typography>
                  }
                  secondContent={
                    <div>
                      {routine.days.map((day, index) => (
                        <Typography 
                          key={index}
                          variant={isSmallScreen ? "body2" : "body1"}
                          style={{ color: 'white', textAlign: 'center' }}
                        >
                          {day.resumen_dia}
                        </Typography>
                      ))}
                    </div>
                  }
                />
              </Link>
            </Grid>
          ))}
          <Grid item>
            <Link 
              component={RouterLink} 
              to='/routine-creator' 
              className="typography-link" 
              sx={{ textDecoration: 'none' }}
            >
              <div className="add-card">+</div>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};
