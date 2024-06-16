import React, { useState } from 'react';
import { Button, Checkbox, Grid, Typography, useMediaQuery, Box } from '@mui/material';

export default function GoalSelector({ options, identifier }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  let objetivo = null;
  let dias = null;

  const handleGoalSelect = (goalId) => {
    if (identifier === "Objetivo") {
      objetivo = options[goalId];
      console.log(objetivo);
    } else {
      dias = options[goalId];
      console.log(dias);
    }
    setSelectedGoal(selectedGoal === goalId ? null : goalId);
  };

  return (
    <Box sx={{ width: '60%', margin: '0 auto' }}>
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        {options.map((option, index) => (
          <Grid item xs={12} key={index}>
            <Button
              variant='contained'
              fullWidth
              sx={{
                color: selectedGoal === index ? '#fff' : '#4b0082',
                backgroundColor: selectedGoal === index ? '#6a0dad' : '#b061fd',
                '&:hover': {
                  backgroundColor: selectedGoal === index ? '#6a0dad' : '#b966f2',
                },
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                padding: isSmallScreen ? '8px' : '12px',
                fontSize: isSmallScreen ? '14px' : '16px',
                justifyContent: 'space-between',
              }}
              disableRipple
              onClick={() => handleGoalSelect(index)}
            >
              <Checkbox
                checked={selectedGoal === index}
                onChange={() => handleGoalSelect(index)}
                color="default"
                sx={{
                  padding: isSmallScreen ? '6px' : '8px',
                  marginLeft: isSmallScreen ? '-6px' : '-8px',
                }}
              />
              <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'center' }}>
                {option}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
