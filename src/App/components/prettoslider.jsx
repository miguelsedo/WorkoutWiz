import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export default function CustomizedSlider({ defaultValue, minValue, maxValue, leftText, rightText, onChange }) {
  const [sliderValue, setSliderValue] = React.useState(defaultValue);

  const handleChange = (event, value) => {
    setSliderValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Box sx={{ width: '100vh' }}>
      <Slider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={sliderValue}
        min={minValue}
        max={maxValue}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="body1" align="left">{leftText}</Typography>
        <Typography variant="body1" align="right">{rightText}</Typography>
      </Box>
      <Box sx={{ m: 3 }} />
    </Box>
  );
}
