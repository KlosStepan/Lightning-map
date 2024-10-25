import { createTheme } from '@mui/material/styles';
import PixgamerRegularTtf from './fonts/PixgamerRegular-OVD6A.ttf';

const ibmPlexSansCondensed = require('@fontsource/ibm-plex-sans-condensed');

export const theme = createTheme({
    typography: {
        h1: { fontFamily: 'PixGamer', fontSize: '2em' },
        h2: { fontFamily: 'PixGamer', fontSize: '1.5em' },
        h3: { fontFamily: 'PixGamer', fontSize: '1.17em' },
        h4: { fontFamily: 'PixGamer', fontSize: '1em' },
        h5: { fontFamily: 'PixGamer', fontSize: '.83em' },
        h6: { fontFamily: 'PixGamer', fontSize: '.67em' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": {
                    fontFamily: "PixGamer",
                    src: `url(${PixgamerRegularTtf}) format("truetype")`,
                },
                p: { fontFamily: "IBM Plex Sans Condensed" },
                body: { fontFamily: "IBM Plex Sans Condensed" },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "PixGamer",
                    fontSize: 18,
                    color: "#000000",
                    paddingLeft: 12,
                    paddingRight: 12,
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    //width: '100%', // Global 100% width for Input components
                    "&:after": { borderBottomColor: "#8000FF" },
                    "&:before": { borderBottomColor: "#F23CFF" },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
        },
    },
    palette: {
        primary: { main: "#F4005E" },
        background: { default: '#F0F0F0' },
    },
});

