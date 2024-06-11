import React from 'react';
import Slider from '@mui/material/Slider';

const SimpleSlider = ({ value, min, max, onChange }) => {
  return (
    <Slider
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      aria-label="Simple slider"
    />
  );
};

export default SimpleSlider;
