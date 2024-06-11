import { CircularProgress, Grid } from '@mui/material';
import './AILoaderStyle.css'
import FloatingSphere from '../../App/components/images/FloatingSphere';



export const GPTLoader = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100%', padding: 4 }}
    >

        <Grid container
            direction='row'
            justifyContent='center'
            >
              <div data-js="astro" className="astronaut">
                <div className="head"></div>
                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>
                <div className="body">
                  <div className="panel"></div>
                </div>
                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>
                <div className="schoolbag"></div>
              </div>
        </Grid>
    </Grid>
  )
}