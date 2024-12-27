import { createTheme } from '@mui/material/styles';
import PixgamerRegularTtf from './fonts/PixgamerRegular-OVD6A.ttf';

const ibmPlexSansCondensed = require('@fontsource/ibm-plex-sans-condensed');

//FONTS 'IBM Plex Sans Condensed'
//      'PixGamer'
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
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "white", // Set background color to white for input
                    borderRadius: "10px", // Set rounded corners for input border
                    padding: "3px 6px 3px 6px !important",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                    },
                    "& .MuiInputBase-input": {
                        fontFamily: "PixGamer", // Set font for input text
                        fontSize: "18px",
                        padding: "3px 6px 3px 6px !important",
                    },
                },
                notchedOutline: {
                    borderRadius: "10px", // Set rounded corners for input border
                    borderColor: "white",
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
