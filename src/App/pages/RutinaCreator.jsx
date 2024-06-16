import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { AppLayout } from "../layout/AppLayout";
import CustomizedSlider from "../components/prettoslider";
import { useForm } from "../../hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../hooks';
import { GPTLoader } from '../../ui/components/GPTLoading';

export const RutinaCreator = () => {
  const [loadinggpt, setLoadinggpt] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const { experiencia, actividad, onInputChange } = useForm({
    experiencia: '1',
    actividad: '30',
  });

  const [response, setResponse] = useState('');
  const experienciaInicial = 10;
  const actividadInicial = 30;
  const entrenosInicial = 3;

  const [experienciaValue, setExperienciaValue] = useState(experienciaInicial);
  const [actividadValue, setActividadValue] = useState(actividadInicial);
  const [entrenosValue, setEntrenosValue] = useState(entrenosInicial);
  const [inputValue, setInputValue] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [dias, setDias] = useState('');
  const [selectedObjetivoButton, setSelectedObjetivoButton] = useState(null);
  const [selectedDiasButton, setSelectedDiasButton] = useState(null);
  const navigate = useNavigate();

  const uid = useSelector(state => state.auth.uid);
  const { userData } = useContext(UserContext);

  const handleObjetivoButtonClick = (content, index) => {
    setObjetivo(content);
    setSelectedObjetivoButton(index);
  };

  const handleDiasButtonClick = (content, index) => {
    setDias(content);
    setSelectedDiasButton(index);
  };
  
  const handleExperienciaChange = (value) => {
    setExperienciaValue(value);
  };
  
  const handleActividadChange = (value) => {
    setActividadValue(value);
  };
  
  const handleEntrenosChange = (value) => {
    setEntrenosValue(value);
  };
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value || null);
  };
  
  const handleSuccess = (response) => {
    console.log('Success:', response);
  };
  
  const handleError = (error) => {
    console.error('Error:', error);
  };
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    if (!objetivo && !dias) {
      setErrorMessage('Error: Objetivo y dias sin datos');
      setSnackbarMessage('Error: Objetivo y dias sin datos');
      setSnackbarOpen(true);
      return;
    } else if (!objetivo) {
      setErrorMessage('Error: Objetivo sin datos');
      setSnackbarMessage('Error: Objetivo sin datos');
      setSnackbarOpen(true);
      return;
    } else if (!dias) {
      setErrorMessage('Error: Dias sin datos');
      setSnackbarMessage('Error: Dias sin datos');
      setSnackbarOpen(true);
      return;
    } else {
      setLoadinggpt(true);
      const prompt = `The user is ${userData.Edad} years old, the height is ${userData.Altura}, the weight is ${userData.Peso}, has ${experienciaValue} months of experience, is ${actividadValue} out of 100 rate of active in the day, currently trains ${entrenosValue} times per week, if exists, the user has the following limitation, please consider it: ${inputValue || 'None'}, has ${objetivo} as a gym goal and wants to train ${dias} times per week.
      Make a training plan in english for the gym divided effectively in the days the user wants to train and display it like this, just this, no other text nor response, just the training like this:
      Day 1 "Title of the training"
      - Exercise 1: x series de x reps
      - Exercise 2: x series de x reps....
      Day 2 "Title of the training"....
      IF the user selects only 1 day, make a fullbody training for one day, easy.
      The title of each day of training should contain what part of the body will be trained(Tren superrior/inferior, or Chest + Triceps, or whatever you think will describe the training accordingly, make the title as short as possible but descriptive)`;

      try {
        const result = await axios.post('https://api.workoutwiz.eu/interact-with-gpt', {
          prompt: prompt
        });
        const rawResponse = result.data.response;
        setResponse(rawResponse);

        console.log('Raw Response:', rawResponse);

        const parsedData = parseTrainingPlan(rawResponse);
        console.log('Parsed Data:', parsedData);

        await saveTrainingPlan(parsedData, objetivo);

        setErrorMessage('');
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoadinggpt(false);
        navigate('/rutinas-guardadas');
      }
    }
  };

  const parseTrainingPlan = (response) => {
    if (!response) {
      throw new Error('Sin respuesta');
    }

    const days = response.split(/Day \d+/).filter(Boolean);

    return days.map((dayContent, index) => {
      if (!dayContent) {
        throw new Error(`Day ${index + 1} is undefined or null`);
      }

      const dayLines = dayContent.trim().split('\n').filter(Boolean);
      const titleLine = dayLines[0].replace(/"/g, '').trim();
      const title = titleLine.replace(/^Day \d+ /, '');

      const exercises = dayLines.slice(1).map((line, lineIndex) => {
        const [exercise, details] = line.split(':');
        if (!exercise || !details) {
          throw new Error(`Formato incorrecto en ${index + 1}, line ${lineIndex + 1}`);
        }
        return {
          exercise: exercise.replace('-', '').trim(),
          details: details.trim(),
          resumen_dia: `Day ${index + 1} ${title}`
        };
      });

      console.log(`Day ${index + 1} Titulo: ${title}`);
      console.log(`Day ${index + 1} Ejercicios:`, exercises);

      return {
        title: `Day ${index + 1} ${title}`,
        resumen_dia: `Day ${index + 1} ${title}`,
        exercises,
        day: index + 1
      };
    });
  };

  const saveTrainingPlan = async (trainingPlan, goal) => {
    const payload = {
      userId: uid,
      trainingPlan: trainingPlan.map((day, index) => ({
        ...day,
        day: index + 1
      })),
      goal: goal
    };
    console.log('Payload to save training plan:', JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post('https://api.workoutwiz.eu/save-training-plan', payload);
      console.log('Training Plan Saved:', response.data);
    } catch (error) {
      console.error('Error saving training plan:', error);
    }
  };

  return (
    <AppLayout>
      {loadinggpt ? (
        <GPTLoader />
      ) : (
        <Grid
          className="animate__animated animate__fadeIn"
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={6}  style={{ width: '100%' }}>
            <section>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ width: '60%' }}
              >
                <svg className="arrows3">
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
                <Typography sx={{ mt: -6 }} variant="h4" gutterBottom style={{ color: '#fff' }}>
                  About you
                </Typography>
                <Grid item xs={12} sm={8} md={6}>
                  <Typography variant="h6" style={{ color: '#fff' }}>
                    Experience at the gym
                  </Typography>
                  <CustomizedSlider
                    defaultValue={experienciaInicial}
                    minValue={0}
                    maxValue={24}
                    leftText="0 months"
                    rightText=" < 24 months"
                    onChange={handleExperienciaChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Typography variant="h6" style={{ color: '#fff' }}>
                    Activity level
                  </Typography>
                  <CustomizedSlider
                    defaultValue={actividadInicial}
                    minValue={0}
                    maxValue={100}
                    leftText="I am barely active"
                    rightText="I am very active"
                    onChange={handleActividadChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Typography variant="h6" style={{ color: '#fff' }}>
                    Current trainings per week
                  </Typography>
                  <CustomizedSlider
                    defaultValue={entrenosInicial}
                    minValue={0}
                    maxValue={7}
                    leftText="0 days"
                    rightText="7 days"
                    onChange={handleEntrenosChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={6} sx={{ mt: 2 }}>
                  <div className="form">
                    <input
                      className="input"
                      placeholder="Do you have any limitation?"
                      type="text"
                      onChange={handleInputChange}
                    />
                    <span className="input-border"></span>
                  </div>
                </Grid>
              </Grid>
            </section>

            <section>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ width: '60%' }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ width: '100%' }}
                >
                  <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                    About your training plan
                  </Typography>
                  <Grid container direction="row" justifyContent="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>What is your goal?</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>How many trainings per week?</Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignContent="center" sx={{ mb: 6 }}>
                    <Grid item sx={{ padding: 2 }} xs={12} sm={6}>
                      {['Loose weight', 'Gain muscle', 'Improve cardio', 'Gain strength', 'Improve explosiveness'].map((goal, index) => (
                        <Button
                          key={index}
                          fullWidth
                          onClick={() => handleObjetivoButtonClick(goal, index)}
                          variant={selectedObjetivoButton === index ? "contained" : "outlined"}
                          sx={{ marginBottom: 1 }}
                        >
                          {goal}
                        </Button>
                      ))}
                    </Grid>
                    <Grid item sx={{ padding: 2 }} xs={12} sm={6}>
                      {['1 day', '2 days', '3 days', '4 days', '5 days'].map((days, index) => (
                        <Button
                          key={index}
                          fullWidth
                          onClick={() => handleDiasButtonClick(days, index)}
                          variant={selectedDiasButton === index ? "contained" : "outlined"}
                          sx={{ marginBottom: 1 }}
                        >
                          {days}
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                  <button onClick={handleClick} className="btn">
                    <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                      <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                    </svg>
                    <span className="text">Generate training plan</span>
                  </button>
                </Grid>
              </Grid>
            </section>
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};
