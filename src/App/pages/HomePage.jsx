import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { AppLayout } from "../layout/AppLayout";
import ContentGrid from "../components/ContentGrid";
import CustomCard from "../../ui/components/card/card";
import { Link as RouterLink } from "react-router-dom";
import GoalSelector from "../components/goalselector";
import CustomizedSlider from "../components/prettoslider";
import '../../ui/components/buttonlearnmore.css';
import '../../ui/components/downarrow/downarrow.css';
import '../components/selectorbutton/selectorbutton.css';
import IASphere from "../components/images/FloatingSphere";
import "../../ui/components/buttonlearnmore.css";

export const HomePage = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <AppLayout>
      <section className="animate__animated animate__fadeIn">
        <ContentGrid width='100%' sx={{ padding: isSmallScreen ? '0 10px' : '0' }}>
          <Typography variant={isSmallScreen ? 'h5' : 'h2'} style={{ color: '#be82ff' }} sx={{ mb: isSmallScreen ? -1 : -2 }}>Welcome to</Typography>
          <Typography variant={isSmallScreen ? 'h4' : 'h1'} sx={{ mb: isSmallScreen ? 2 : 4 }}>
            <span style={{
              background: `radial-gradient(circle, #be82ff -200%, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textShadow: '0px 0px 20px #be82ff'
            }}>WorkoutWiz</span>
          </Typography>
          <svg className="arrows">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
            <path className="a3" d="M0 40 L30 72 L60 40"></path>
          </svg>
        </ContentGrid>
      </section>
            <section>
        <ContentGrid width='100%' sx={{ padding: isSmallScreen ? '0 10px' : '0' }}>
          <IASphere />
          <Typography variant={isSmallScreen ? 'h6' : 'h3'} style={{ color: '#be82ff' }} sx={{ mt: 3, mb: isSmallScreen ? 1 : -1 }}>Your personal trainer powered by {' '}
            <span 
            style={{
                background: `radial-gradient(circle, #42C9FF  30%, #FF00D4)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                textShadow: '0px 0px 10px #be82ff'
            }}>AI</span>
          </Typography>
          <div style={{ position: 'relative', bottom: isSmallScreen ? '-20vh' : '-33vh' }}>
            <Typography variant='body2' style={{ color: '#ffffff' }}>How does it work?</Typography>
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
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              padding: 2,
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
          <svg className="arrows3">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
            <path className="a3" d="M0 40 L30 72 L60 40"></path>
          </svg>
          <Typography variant={isSmallScreen ? 'h5' : 'h2'} gutterBottom style={{ color: '#fff' }} sx={{ mt: isSmallScreen ? -8 : -10, mb: isSmallScreen ? 2 : 1 }}>
            First enter your data
          </Typography>

          <Grid item style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px' }}>
            <Typography variant="h6" style={{ color: '#fff' }}>
              Experience at the gym
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px' }}> 
            <CustomizedSlider
              defaultValue={4}
              minValue={0}
              maxValue={24}
              leftText="0 months"
              rightText=" < 24 months"
            />
          </Grid>
          <Grid item style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px'}}>
            <Typography variant="h6" style={{ color: '#fff' }}>
              Activity level
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px' }}>
            <CustomizedSlider
              defaultValue={4}
              minValue={0}
              maxValue={100}
              leftText="I am barely active"
              rightText="I am very active"
            />
          </Grid>
          <Grid item style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px' }}>
            <Typography variant="h6" style={{ color: '#fff' }}>
              Current trainings per week
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="space-between" style={{ width: '100%', maxWidth: isSmallScreen ? '300px' : '600px' }} marginBottom={3}>
            <CustomizedSlider
              defaultValue={4}
              minValue={0}
              maxValue={7}
              leftText="0 days"
              rightText="7 days"
            />
          </Grid>

          <ContentGrid width='100%' maxWidth={isSmallScreen ? '300px' : '600px'}>
            <Typography variant='h5' gutterBottom style={{ color: '#be82ff' }}>Then select a goal</Typography>
            <GoalSelector options={['Loose weight', 'Gain muscle', 'Improve cardio']} />
          </ContentGrid>
        </Grid>
      </section>

      <section>
        <ContentGrid width='100%' sx={{ padding: isSmallScreen ? '0 10px' : '0' }}>
          <Typography variant={isSmallScreen ? 'h6' : 'h3'} sx={{ mt: 3, mb: 3 }}
            style={{
              background: `radial-gradient(circle, #42C9FF 30%, #FF00D4)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textShadow: '0px 0px 4px #be82ff'
            }}>Get a training plan like this!</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} justifyContent='center'>
              {/* First Card */}
              <Grid item xs={6} sm={4} md={4}>
                <CustomCard
                  firstContent={
                    <div className="exercise-group">
                      <h1>🏋️</h1>
                      <h3>Chest + triceps</h3>
                    </div>
                  }
                  secondContent={
                    <div className="workout-plan">
                      <div className="exercise-group">
                        <h3>Chest</h3>
                        <p>Benchpress: 3 x 10</p>
                        <p>Parallel bar dips: 3 x 12</p>
                        <p>Dumbell flies: 3 x 12</p>
                      </div>
                      <div className="exercise-group">
                        <h3>Triceps</h3>
                        <p>Cable extension: 3 x 10</p>
                        <p>Bench dips: 3 x 12</p>
                        <p>Tricep kickbacs: 3 x 12</p>
                      </div>
                    </div>
                  }
                />
              </Grid>

              {/* Second Card */}
              <Grid item xs={6} sm={4} md={4}>
                <CustomCard
                  firstContent={
                    <div className="exercise-group">
                      <h1>💪</h1>
                      <h3>Back + biceps</h3>
                    </div>
                  }
                  secondContent={
                    <div className="workout-plan">
                      <div className="exercise-group">
                        <h3>Back</h3>
                        <p>Barbell Row: 3 x 10</p>
                        <p>Pull-ups: 3 x 8</p>
                        <p>Deadlift: 3 x 8</p>
                      </div>
                      <div className="exercise-group">
                        <h3>Biceps</h3>
                        <p>Barbell Bicep Curl: 3 x 10</p>
                        <p>Hammer Curl: 3 x 12</p>
                        <p>Concentration Curl: 3 x 10</p>
                      </div>
                    </div>
                  }
                />
              </Grid>

              {/* Third Card */}
              <Grid item xs={6} sm={4} md={4}>
                <CustomCard
                  firstContent={
                    <div className="exercise-group">
                      <h1>🦵</h1>
                      <h3>Leg + Shoulder</h3>
                    </div>
                  }
                  secondContent={
                    <div className="workout-plan">
                      <div className="exercise-group">
                        <h3>Leg</h3>
                        <p>Squats: 4 x 10</p>
                        <p>Leg Press: 3 x 12</p>
                        <p>Leg Extensions: 3 x 15</p>
                      </div>
                      <div className="exercise-group">
                        <h3>Shoulder</h3>
                        <p>Military Press: 4 x 8</p>
                        <p>Lateral Raises: 3 x 12</p>
                        <p>Shoulder Shrugs: 3 x 15</p>
                      </div>
                    </div>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item sx={{ mt: 6 }}>
            <Link component={RouterLink} to='/routine-creator' className="typography-link" sx={{ textDecoration: 'none' }}>
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Get yours now</span>
              </button>
            </Link>
          </Grid>
        </ContentGrid>
      </section>
    </AppLayout>
  );
};
