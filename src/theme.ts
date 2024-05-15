import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { createTheme } from '@mui/material';
import myPixgamerFont from './myPixgamerFont';

export const theme = createTheme({
    typography: {
        fontSize: 5,
        fontFamily: 'PixGamer Regular', // Ensure font family matches the font face name
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@global': {
                    '@font-face': myPixgamerFont
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#F4005E",
        },
        background: {
            default: '#F0F0F0', // Set your desired grey color
        },
    },
});

