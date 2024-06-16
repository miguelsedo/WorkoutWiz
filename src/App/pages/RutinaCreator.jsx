import React, { useState, useEffect, useContext } from 'react';
import { Button, Checkbox, Grid, Slider, TextField, Typography } from "@mui/material";
import { AppLayout } from "../layout/AppLayout";
import CustomizedSlider from "../components/prettoslider";
import { useForm } from "../../hooks";
import AddDataButton from '../components/DBAddDataButton';
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../hooks';
import {GPTLoader} from '../../ui/components/GPTLoading'
import { Snackbar, Alert } from "@mui/material";





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

  const handleButtonClick = (goalId) => {
      const sliderValuesArray = [experienciaValue, actividadValue, entrenosValue, inputValue];

      if (!objetivo && !dias) {
          setErrorMessage('Error: Missing values for objetivo and dias');
      } else if (!objetivo) {
          setErrorMessage('Error: Missing value for objetivo');
      } else if (!dias) {
          setErrorMessage('Error: Missing value for dias');
      } else {
          console.log("Slider values:", sliderValuesArray);
          console.log(objetivo, dias);
      }
      navigate('/rutinas-guardadas');
  };

  const dataToSend = {
      tableName: 'datos_gym',
      data: {
          persona_id: uid,
          gymxp: experienciaValue,
          actividad: actividadValue,
          entrenos: entrenosValue,
          limitacion: inputValue,
          objetivo: objetivo,
          dias: dias
      }
  };

  const handleClick = async () => {
    
      if (!objetivo && !dias) {
        setErrorMessage('Error: Objetivo y dias sin datos');
        setSnackbarMessage('Error: Objetivo y dias sin datos');
        setSnackbarOpen(true);
        return
    } else if (!objetivo) {
        setErrorMessage('Error: Objetivo sin datos');
        setSnackbarMessage('Error: Objetivo sin datos');
        setSnackbarOpen(true);
        return
    } else if (!dias) {
        setErrorMessage('Error: Dias sin datos');
        setSnackbarMessage('Error: Dias sin datos');
        setSnackbarOpen(true);
        return
    }
    else {
      setLoadinggpt(true);
      const prompt = `The user is ${userData.Edad} years old, the height is ${userData.Altura}, the weight is ${userData.Peso}, has ${experienciaValue} months of experience, is ${actividadValue} out of 100 rate of active in the day, currently trains ${entrenosValue} times per week, if exists, the user has the following limitation, please consider it: ${inputValue || 'None'}, has ${objetivo} as a gym goal and wants to train ${dias} times per week.
      
    Make a training plan in spanish for the gym divided effectively in the days the user wants to train and display it like this, just this, no other text nor response, just the training like this:
    Dia 1 "Title of the training"
    - Ejercicio 1: x series de x repeticiones
    - Ejercicio 2: x series de x repeticiones....
    Dia 2 "Title of the training"....

    IF the user selects only 1 day, make a fullbody training for one day, easy.
    
    The title of each day of training should contain what part of the body will be trained(Tren superrior/inferior, or Chest + Triceps, or whatever you think will describe the training accordingly, make the title as short as possible but descriptive)`;

      try {
          const result = await axios.post('https://api.workoutwiz.eu/interact-with-gpt', {
              prompt: prompt
          });
          const rawResponse = result.data.response;
          setResponse(rawResponse);

          console.log('Raw Response:', rawResponse);

          // Parse the response
          const parsedData = parseTrainingPlan(rawResponse);
          console.log('Parsed Data:', parsedData);

          // Guardar en db
          await saveTrainingPlan(parsedData, objetivo);

          setErrorMessage('');
      } catch (error) {
          console.error('Error:', error.message);
      }finally {
      setLoadinggpt(false);
      navigate('/rutinas-guardadas');
    }
  }
  };


  const parseTrainingPlan = (response) => {
    if (!response) {
        throw new Error('Sin respuesta');
    }

    const days = response.split(/D[íi]a \d+/).filter(Boolean);

    return days.map((dayContent, index) => {

        if (!dayContent) {
            throw new Error(`Day ${index + 1} is undefined or null`);
        }

        const dayLines = dayContent.trim().split('\n').filter(Boolean);
        const titleLine = dayLines[0].replace(/"/g, '').trim(); 
        const title = titleLine.replace(/^Día \d+ /, ''); 

        const exercises = dayLines.slice(1).map((line, lineIndex) => {
            const [exercise, details] = line.split(':');
            if (!exercise || !details) {
                throw new Error(`Formato incorrecto en ${index + 1}, line ${lineIndex + 1}`);
            }
            return {
                exercise: exercise.replace('-', '').trim(),
                details: details.trim(),
                resumen_dia: `Día ${index + 1} ${title}` 
            };
        });

        console.log(`Day ${index + 1} Titlo: ${title}`);
        console.log(`Day ${index + 1} Ejercicios:`, exercises);

        return {
            title: `Día ${index + 1} ${title}`,
            resumen_dia: `Día ${index + 1} ${title}`,
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
              day: index + 1 //Numerar dias
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
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item style={{ width: '100%' }}>
          {/* Descripcion gym */}
          <section>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', minHeight: '100vh' }}
            >
              <svg className="arrows3">
                <path className="a1" d="M0 0 L30 32 L60 0"></path>
                <path className="a2" d="M0 20 L30 52 L60 20"></path>
                <path className="a3" d="M0 40 L30 72 L60 40"></path>
              </svg>
              <Typography sx={{ mt: -6 }} variant="h1" gutterBottom style={{ color: '#fff' }}>
                Sobre tí
              </Typography>
              <Grid item style={{ width: '50%' }}>
                <Typography variant="h4" style={{ color: '#fff' }}>
                  Experiencia en gimnasio
                </Typography>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '50%' }}>
                <CustomizedSlider
                  defaultValue={experienciaInicial}
                  minValue={0}
                  maxValue={24}
                  leftText="0 meses"
                  rightText=" < 24 meses"
                  onChange={handleExperienciaChange}
                />
              </Grid>
              <Grid item style={{ width: '50%' }}>
                <Typography variant="h4" style={{ color: '#fff' }}>
                  Nivel de actividad
                </Typography>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '50%' }}>
                <CustomizedSlider
                  defaultValue={actividadInicial}
                  minValue={0}
                  maxValue={100}
                  leftText="Tengo vida sedentaria"
                  rightText="Tengo actividad durante el día"
                  onChange={handleActividadChange}
                />
              </Grid>
              <Grid item style={{ width: '50%' }}>
                <Typography variant="h4" style={{ color: '#fff' }}>
                  Entrenos por semana
                </Typography>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '50%' }}>
                <CustomizedSlider
                  defaultValue={entrenosInicial}
                  minValue={0}
                  maxValue={7}
                  leftText="No entreno aún"
                  rightText="Entreno 7 días"
                  onChange={handleEntrenosChange}
                />
              </Grid>
              <Grid item sx={{ mt: 2 }} style={{ width: '50%' }}>
                <div className="form">
                  <input
                    className="input"
                    placeholder="¿Tienes alguna limitación?"
                    type="text"
                    onChange={handleInputChange} // Call handleInputChange on input change
                  />
                  <span className="input-border"></span>
                </div>
              </Grid>
            </Grid>
          </section>

          {/* Objetivo */}
          <section>
            <Grid item sx={{ mt: 8, mb: 8 }} style={{ width: '100%' }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ width: '100%' }}
              >
                <Typography variant="h1" gutterBottom style={{ color: '#fff' }}>
                  Sobre tu rutina
                </Typography>
                <Grid container direction="row" justifyContent="center">
                  <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>¿Cuál es tu objetivo?</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>¿Cuantos días/semana quieres entrenar?</Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignContent="center" sx={{ mb: 6 }}>
                  <Grid container sx={{ padding: 2 }} direction="column" width={'50dvh'}>
                    <Button
                      fullWidth
                      onClick={() => handleObjetivoButtonClick('Perder Grasa', 0)}
                      variant={selectedObjetivoButton === 0 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >
                      Perder Grasa
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleObjetivoButtonClick('Ganar músculo', 1)}
                      variant={selectedObjetivoButton === 1 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >
                      Ganar músculo
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleObjetivoButtonClick('Ganar resistencia', 2)}
                      variant={selectedObjetivoButton === 2 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >Ganar resistencia
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleObjetivoButtonClick('Aumentar fuerza', 3)}
                      variant={selectedObjetivoButton === 3 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >Aumentar fuerza
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleObjetivoButtonClick('Mejorar explosividad', 4)}
                      variant={selectedObjetivoButton === 4 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >Mejorar explosividad
                    </Button>
                  </Grid>
                  <Grid container sx={{ padding: 2 }} direction="column" width={'50dvh'}>
                    <Button
                      fullWidth
                      onClick={() => handleDiasButtonClick('1 día', 0)}
                      variant={selectedDiasButton === 0 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >1 día
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleDiasButtonClick('2 días', 1)}
                      variant={selectedDiasButton === 1 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >2 días
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleDiasButtonClick('3 días', 2)}
                      variant={selectedDiasButton === 2 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >3 días
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleDiasButtonClick('4 días', 3)}
                      variant={selectedDiasButton === 3 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >4 días
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleDiasButtonClick('5 días', 5)}
                      variant={selectedDiasButton === 5 ? "contained" : "outlined"}
                      sx={{ marginBottom: 1 }}
                    >5 días
                    </Button>
                  </Grid>
                </Grid>
                <button onClick={handleClick} className="btn">
                  <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                    <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                  </svg>
                  <span className="text">Generar entrenamiento</span>
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
