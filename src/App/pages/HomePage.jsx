import { Box, Grid, Link, Typography } from "@mui/material";
import { AppLayout } from "../layout/AppLayout";
import ContentGrid from "../components/ContentGrid";
import IASphere from "../components/images/FloatingSphere";
import "../../ui/components/buttonlearnmore.css";
import CustomCard from "../../ui/components/card/card"

import { Link as RouterLink } from "react-router-dom";
import GoalSelector from "../components/goalselector";
import '../../ui/components/downarrow/downarrow.css'
import '../components/selectorbutton/selectorbutton.css'
import CustomizedSlider from "../components/prettoslider";


export const HomePage = () => {
  return (

    <AppLayout>

        <section className="animate__animated animate__fadeIn">
          <ContentGrid width='100%'>

              <Typography  variant='h2' style={{ color: '#be82ff' }}sx={{ mb: -2 }}>Bienvenido a</Typography> {/* White text color */}
              <Typography variant='h1' sx={{ mb: 4 }}>
              <span style={{
                background: `radial-gradient(circle, #be82ff -200%, #ffffff)`,
                'WebkitBackgroundClip': 'text',
                'WebkitTextFillColor': 'transparent',
                fontWeight: 'bold',
                textShadow: '0px 0px 20px #be82ff' // White outline
              }}>WorkoutWiz
              </span>
              </Typography>
              <svg className="arrows">
                <path className="a1" d="M0 0 L30 32 L60 0"></path>
                <path className="a2" d="M0 20 L30 52 L60 20"></path>
                <path className="a3" d="M0 40 L30 72 L60 40"></path>
              </svg>

          </ContentGrid>

        </section>
        
        <section>
          <ContentGrid width='100%'>
            <IASphere/>
            <Typography variant='h3' style={{color:'#be82ff'}} sx={{ mt:3,mb: -1}}>Tu entrenador personal basado en {' '}
              <span
              style={{
                background: `radial-gradient(circle, #42C9FF  30%, #FF00D4)`,
                'WebkitBackgroundClip': 'text',
                'WebkitTextFillColor': 'transparent',
                fontWeight: 'bold',
                textShadow: '0px 0px 10px #be82ff'
              }}>IA</span></Typography>
            <div style={{ position: 'relative', bottom: '-33vh'}}>
              <Typography variant='body2' style={{ color: 'leve' }}>¿Cómo funciona?</Typography>
            </div>
            <svg className="arrows">
              <path className="a1" d="M0 0 L30 32 L60 0"></path>
              <path className="a2" d="M0 20 L30 52 L60 20"></path>
              <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
          </ContentGrid>

        </section>

        <section>
          <Grid container 
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                  mb: -1.6,
                  padding: 2.4,
                  borderRadius: 1.6,
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
          }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ width: '100%'}}
          >
            <svg className="arrows3">
                <path className="a1" d="M0 0 L30 32 L60 0"></path>
                <path className="a2" d="M0 20 L30 52 L60 20"></path>
                <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
            <Typography variant="h2" gutterBottom style={{ color: '#fff' }} sx={{mt:-10}}>
              Introduce tu información
            </Typography>

            <Grid item style={{ width: '40%' }}>
              <Typography variant="h5" style={{ color: '#fff' }}>
                Experiencia en gimnasio
              </Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '40%'}}> 
              <CustomizedSlider
                defaultValue={4}
                minValue={0}
                maxValue={24}
                leftText="0 meses"
                rightText=" < 24 meses"
              />
            </Grid>
            <Grid item style={{ width: '40%' }}>
              <Typography variant="h5" style={{ color: '#fff' }}>
                Nivel de actividad
              </Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '40%'}}>

              <CustomizedSlider
                defaultValue={4}
                minValue={0}
                maxValue={100}
                leftText="Tengo vida sedentaria"
                rightText="Tengo actividad durante el día"
              />
            </Grid>
            <Grid item style={{ width: '40%' }}>
              <Typography variant="h5" style={{ color: '#fff' }}>
                Entrenos por semana
              </Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '40%'}}>
              <CustomizedSlider
                defaultValue={4}
                minValue={0}
                maxValue={7}
                leftText="0 días"
                rightText="7 días"
              />
            </Grid>
          </Grid>

              <ContentGrid width='40%' marginTop={-5}>
                  <Typography variant='h4' gutterBottom style={{color:'#be82ff'}} >Selecciona tu objetivo</Typography>
                  <GoalSelector options={['Perder grasa', 'Ganar músculo', 'Ganar resistencia']} />
              </ContentGrid>
              {/* <KeyboardDoubleArrowDown className="spinner2" style={{ color: '#99ffff', fontSize: '1.6em' }}/> */}

          </Grid>


        </section>

        <section >
        <ContentGrid width='100%'>

          <Typography variant='h3'sx={{ mt:3,mb: 7}}
            style={{
              background: `radial-gradient(circle, #42C9FF  30%, #FF00D4)`,
              'WebkitBackgroundClip': 'text',
              'WebkitTextFillColor': 'transparent',
              fontWeight: 'bold',
              textShadow: '0px 0px 4px #be82ff'
            }}>¡Recibe una rutina como esta!</Typography>
        <Box sx={{ flexGrow: 1, p: 3, }}>
          <Grid container spacing={3} justifyContent='center'>
            {/* First Card */}
            <Grid item>

              <CustomCard
                firstContent={              
                <div className="exercise-group">
                <h1>🏋️</h1>
                <h3>Pecho + tríceps</h3>
                </div>
                }
                secondContent={
                <div className="workout-plan">
                  <div className="exercise-group">
                    <h3>Pecho</h3>
                    <p>Press de banca: 3 x 10</p>
                    <p>Fondos en paralelas: 3 x 12</p>
                    <p>Aperturas con mancuernas: 3 x 12</p>
                  </div>
                  <div className="exercise-group">
                    <h3>Tríceps</h3>
                    <p>Extensión en polea: 3 x 10</p>
                    <p>Fondos en banco: 3 x 12</p>
                    <p>Patada de tríceps: 3 x 12</p>
                  </div>
                </div>
              }/>

            </Grid>

            {/* Second Card */}
            <Grid item>
              <CustomCard
                firstContent={
                <div className="exercise-group">
                  <h1>💪</h1>
                  <h3>Espalda + bíceps</h3>
                </div>
                }
                secondContent={
                <div className="workout-plan">
                  <div className="exercise-group">
                    <h3>Espalda</h3>
                    <p>Remo con barra: 3 x 10</p>
                    <p>Dominadas: 3 x 8</p>
                    <p>Peso muerto: 3 x 8</p>
                  </div>
                  <div className="exercise-group">
                    <h3>Bíceps</h3>
                    <p>Curl de bíceps con barra: 3 x 10</p>
                    <p>Curl martillo: 3 x 12</p>
                    <p>Curl concentrado: 3 x 10</p>
                  </div>
                </div>
                }
              />
            </Grid>

            {/* Third Card */}
            <Grid item>

              <CustomCard
                firstContent={
                <div className="exercise-group">
                  <h1>🦵</h1>
                  <h3>Pierna + hombro</h3>
                </div>
                }
                secondContent={
                <div className="workout-plan">
                  <div className="exercise-group">
                    <h3>Pierna</h3>
                    <p>Sentadillas: 4 x 10</p>
                    <p>Prensa de piernas: 3 x 12</p>
                    <p>Extensiones de piernas: 3 x 15</p>
                  </div>
                  <div className="exercise-group">
                    <h3>Hombro</h3>
                    <p>Press militar: 4 x 8</p>
                    <p>Elevaciones laterales: 3 x 12</p>
                    <p>Encogimientos de hombros: 3 x 15</p>
                  </div>
                </div>


                }
              />

            </Grid>
          </Grid>
        </Box>
          <Grid item sx={{mt:6}}>
            <Link component={RouterLink} to='/routine-creator' className="typography-link" sx={{ textDecoration: 'none' }}>

              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">Crea la tuya ahora</span>
              </button>

            </Link>
          </Grid>

        </ContentGrid>

        </section>

    </AppLayout>
  )};

