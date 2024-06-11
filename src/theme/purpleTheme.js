import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#7b00ff', 
        },
        secondary: {
            main: '#543884',
        },
        leve: {
            main: '#d5adff',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: 'grey', // Color de texto
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Color de label
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#666', // Borde negro default
                        },
                        '&:hover fieldset': {
                            borderColor: '#7b00ff', // Borde blanco al hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7b00ff', // Color princial
                        },
                    },
                },
            },
        },
    },
});

