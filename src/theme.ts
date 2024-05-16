import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { createTheme } from '@mui/material';
import myPixgamerFont from './myPixgamerFont';
import PixgamerRegularTtf from './fonts/PixgamerRegular-OVD6A.ttf';
import PixgamerRegularWoff from './fonts/PixgamerRegular-BWVqG.woff';

const ibmPlexSansCondensed = require('@fontsource/ibm-plex-sans-condensed');

export const theme = createTheme({
    //                local('PixGamer'),

    typography: {
        //fontSize: 15,
        //fontFamily: 'PixGamer Regular', // Ensure font family matches the font face name
        h1: {
            fontFamily: 'PixGamer', // Should match the fontFamily in the theme
            //fontStyle: 'normal',
            //fontColor: '#FF0000',
            //fontWeight: 400,
            fontSize: '2em',
            //NOT WORKING vv - gotta do it via <CssBaseline /> further down
            //src: `url(${PixgamerRegularTtf}) format("truetype")`,
        },
        h2: {
            fontFamily: 'PixGamer',
            fontSize: '1.5em',
        },
        h3: {
            fontFamily: 'PixGamer',
            fontSize: '1.17em',
        },
        h4: {
            fontFamily: 'PixGamer',
            fontSize: '1em',
        },
        h5: {
            fontFamily: 'PixGamer',
            fontSize: '.83em',
        },
        h6: {
            fontFamily: 'PixGamer',
            fontSize: '.67em',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": {
                    fontFamily: "PixGamer",
                    src: `url(${PixgamerRegularTtf}) format("truetype")`
                    //src: `url(${PixgamerRegularWoff}) format("woff")`
                },
                p: {
                    fontFamily: "IBM Plex Sans Condensed"
                },
                body: {
                    fontFamily: "IBM Plex Sans Condensed"
                }
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
                    //subtitle1: 'h2',
                    //subtitle2: 'h2',
                    //body1: 'span',
                    //body2: 'span',
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

