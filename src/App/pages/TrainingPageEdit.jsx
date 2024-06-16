import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, CircularProgress, Grid } from "@mui/material";
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const TrainingPageEdit = () => {
    const { id: routineId } = useParams();
    const userId = useSelector(state => state.auth.uid);
    const [routineDetails, setRoutineDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingExercise, setLoadingExercise] = useState(false); // Loading state for exercise
    const navigate = useNavigate();

    const handleChangeExercise = async (exercise) => {
        console.log("Exercise ID:", exercise.exercise_id);
        console.log("Exercise:", exercise.ejercicio);
        console.log("Details:", exercise.details);
        const prompt= `Genera un ejercicio que entrene el mismo músculo que este:
        Ejercicio: ${exercise.ejercicio}
        Detalles: ${exercise.details}
        Puedes ser creativo y usar el propio peso, maquinas de gimnasio...           
        El mensaje que quiero de vuelta debe tener la siguente estructura, se breve:
        Ejercicio:Detalles(ejemplo de Detalles 3 series de 8 repeticiones) 
        `;
        setLoadingExercise(true);
        try {
            const response = await axios.post('http://api.workoutwiz.eu/interact-with-gpt', { prompt });
            console.log('Generated exercise response:', response.data.response);
            const parsedResponse = parseGPTResponse(response.data.response);
            console.log('Parsed Exercise:', parsedResponse.ejercicio);
            console.log('Parsed Details:', parsedResponse.details);
            
            // Update ejercicio concreto en la bd
            await axios.put(`http://api.workoutwiz.eu/update-exercise/${userId}/${exercise.exercise_id}`, {
                ejercicio: parsedResponse.ejercicio,
                details: parsedResponse.details
            });

            // Actualizar estado
            setRoutineDetails(prevState => {
                const updatedDays = prevState.days.map(day => {
                    return {
                        ...day,
                        activities: day.activities.map(act => {
                            if (act.exercise_id === exercise.exercise_id) {
                                return {
                                    ...act,
                                    ejercicio: parsedResponse.ejercicio,
                                    details: parsedResponse.details
                                };
                            }
                            return act;
                        })
                    };
                });

                return { ...prevState, days: updatedDays };
            });

            console.log('Ejercicio actualizado');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingExercise(false);
        }
    };

    useEffect(() => {
        if (routineId && userId) {
            fetch(`http://api.workoutwiz.eu/routine-detail/${routineId}/${userId}`)
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

    const handleDeleteRoutine = async () => {
        if (window.confirm('Are you sure you want to delete this training plan?')) {
            try {
                const response = await fetch(`http://api.workoutwiz.eu/delete-routine/${routineId}/${userId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Routine deleted successfully');
                    navigate("/rutinas-guardadas"); // Use navigate for SPA-like behavior
                } else {
                    console.error('Failed to delete the routine');
                }
            } catch (error) {
                console.error('Error deleting the routine:', error);
            }
        }
    };

    const parseGPTResponse = (response) => {
        const lines = response.split('\n');
        const ejercicioLine = lines.find(line => line.startsWith('Ejercicio:'));
        const detailsLine = lines.find(line => line.startsWith('Detalles:'));
    
        const ejercicio = ejercicioLine ? ejercicioLine.split(':')[1].trim() : '';
        const details = detailsLine ? detailsLine.split(':')[1].trim() : '';
    
        if (!ejercicio || !details) {
            throw new Error('Invalid GPT response format');
        }
    
        return { ejercicio, details };
    };

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
                background: 'linear-gradient(to right, #232526, #414345)'  // Dark gradient background
            }}
        >
            <IconButton component={RouterLink} to={`/rutina/${routineId}/${userId}/`} sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
                <ArrowBackIos />
            </IconButton>
            <IconButton onClick={handleDeleteRoutine} sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}>
                <Delete />
            </IconButton>
            {routineDetails && (
                <Grid container alignItems="center" justifyContent="center" sx={{
                    position: 'relative', 
                    top: 16, 
                    width: '70%', 
                    textAlign: 'center',
                    mb:4
                }}>
                    <Grid item>
                        <Typography variant="h4" sx={{ color: 'white' }}>
                            {routineDetails.titulo}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ ml: 4 }}>
                        <IconButton component={RouterLink} to={`/edit-routine/${routineId}`} sx={{ color: 'white' }}>
                            <Edit />
                        </IconButton>
                    </Grid>
                </Grid>
            )}

            {routineDetails && routineDetails.days.map((day, index) => (
                <Paper
                    className="animate__animated animate__fadeIn"
                    key={index}
                    elevation={3}
                    sx={{
                        mt: 2,
                        mb: 2,
                        p: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: 'white',
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.8), rgba(35, 35, 35, 0.2))'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {day.activities[0]?.resumen_dia}
                    </Typography>
                    <Grid container>
                        {day.activities.map((activity, idx) => (
                            <Grid item xs={12} key={idx} className="exercise-entry" sx={{
                                marginBottom: 1,
                            }} 
                            onClick={() => handleChangeExercise(activity)}>

                                <Typography>
                                    {activity.ejercicio}: {activity.details}
                                </Typography>
                                <IconButton className="editIcon">
                                    <RefreshIcon />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            ))}

            {loadingExercise && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};
