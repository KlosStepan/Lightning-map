import PixgamerRegularTtf from './fonts/PixgamerRegular-OVD6A.ttf';
import PixgamerRegularTtf2 from './fonts/PixgamerRegular-PKxO2.ttf';
//import PixgamerRegularWoff from './fonts/PixgamerRegular-BWVqG.woff';
//import PixgamerRegularWoff2 from './fonts/PixgamerRegular-PKxO2.ttf';

const PixgamerRegular = {
    fontFamily: 'PixGamer', // Should match the fontFamily in the theme
    fontStyle: 'normal',
    fontColor: '#FF0000',
    fontWeight: 400,
    src: `
        local('PixGamer-Regular'),
        url(${PixgamerRegularTtf}) format('truetype'),
    `,
};
//should be ttf                         vv
//url(${PixgamerRegularWoff2}) format('woff2')
//url(${PixgamerRegularWoff}) format('woff'),


export default PixgamerRegular;
