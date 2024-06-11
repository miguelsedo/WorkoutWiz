import React, { useState } from 'react';
import { Button, Checkbox, Grid, Typography } from '@mui/material';

export default function GoalSelector({ options, identifier }) {
  // State to store selected goals for the current identifier
  const [selectedGoal, setSelectedGoal] = useState(null);
  let objetivo = null;
  let dias = null;

  const handleGoalSelect = (goalId) => {

    if (identifier === "Objetivo") 
      { objetivo = (options[goalId]) 
        console.log(objetivo)
    }else{
      dias = (options[goalId]) 
      console.log(dias)
    }

    // Update the selected goal for the current identifier
    setSelectedGoal(selectedGoal === goalId ? null : goalId);
  };

  return (
    <Grid container spacing={2}>
      {options.map((option, index) => (
        <Grid item xs={12} key={index}>
          <Button
            variant='contained'
            fullWidth
            sx={{
              color: selectedGoal === index ? '#4b0082' : 'rgba(255, 255, 255, 0.01)',
              backgroundColor: selectedGoal === index ? '#d8bfd8' : 'rgba(190, 130, 255, 0.5)',
              '&:hover': {
                backgroundColor: selectedGoal === index ? '#d8bfd8' : '#ae72e6',
              },
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              fontSize: '18px',
              justifyContent: 'space-between',
              '&.selected': {},
            }}
            disableRipple
            disabled={selectedGoal === index}
            // Add 'selected' class when button is selected
            className={selectedGoal === index ? 'selected' : ''}
            onClick={() => handleGoalSelect(index)}
          >
            <Checkbox
              checked={selectedGoal === index}
              onChange={() => handleGoalSelect(index)}
              color="leve"
              sx={{ padding: '8px', marginLeft: '-8px' }}
            />
            <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {option}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );

}
 