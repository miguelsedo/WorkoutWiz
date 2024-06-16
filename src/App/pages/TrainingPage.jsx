import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const TrainingPage = () => {
    const { id: routineId } = useParams();
    const userId = useSelector(state => state.auth.uid);
    const [routineDetails, setRoutineDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        if (routineId && userId) {
            fetch(`https://api.workoutwiz.eu/routine-detail/${routineId}/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setRoutineDetails(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching routine details:", error);
                    setLoading(false);
                });
        }
    }, [routineId, userId]);

    console.log(routineDetails);

    return (
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                position: 'relative',
                background: 'linear-gradient(to right, #232526, #414345)'
            }}
        >
            <IconButton component={RouterLink} to="/rutinas-guardadas" sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
                <ArrowBackIos />
            </IconButton>

            {routineDetails && (
                <Grid container alignItems="center" justifyContent="center" sx={{
                    position: 'relative', 
                    top: 16, 
                    width: '70%', 
                    textAlign: 'center',
                    mb: 4
                }}>
                    <Grid item>
                        <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ color: 'white' }}>
                            {routineDetails.titulo}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ ml: 4 }}>
                        <IconButton component={RouterLink} to={`/rutina-edit/${routineId}/${userId}/`} sx={{ color: 'white' }}>
                            <Edit />
                        </IconButton>
                    </Grid>
                </Grid>
            )}

            {routineDetails && routineDetails.days.map((day, index) => (
                <Paper 
                className="animate__animated animate__fadeIn"
                key={index} elevation={3} sx={{
                    mt: 2,
                    mb: 2,
                    p: isSmallScreen ? 2 : 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    width: '100%',
                    maxWidth: isSmallScreen ? '100%' : '600px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.8), rgba(35, 35, 35, 0.2))'
                }}>
                    <Typography variant={isSmallScreen ? "subtitle1" : "h6"} gutterBottom>
                        {day.resumen_dia}
                    </Typography>
                    {day.activities.map((activity, idx) => (
                        <Typography key={idx} variant={isSmallScreen ? "body2" : "body1"}>
                            {activity.ejercicio}: {activity.details}
                        </Typography>
                    ))}
                </Paper>
            ))}

            {loading && (
                <CircularProgress sx={{ color: 'white' }} />
            )}
        </Box>
    );
};
