import Box from '@mui/material/Box';
import { Card, CardMedia, Grid } from '@mui/material';
import { Container, CssBaseline, Paper } from "@mui/material";

import Typography from '@mui/material/Typography';


const containerInnerStyle = {
    gap: '20px',
    opacity: '0px',
};
//Down 3 boxes for LN info
const containerOuterStyle = {
    //width: '315px',
    //height: '478px',
    padding: '32px 0px 10px 0px',
    gap: '10px',
    borderRadius: '24px 24px 24px 24px',
    opacity: '0px',
    backgroundColor: 'white', // Adding background color
    margin: '0px 0px 10px 0px',
};

// Define the type for the props
type TilePitchProps = {
    image: string;
    title: string;
    paragraph: string;
};


// Define the component using the defined props type
const TileExplainer: React.FC<TilePitchProps> = ({ image, title, paragraph }) => {
    return (
        <Container maxWidth="sm" sx={containerOuterStyle}>

            <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                <div style={{ width: 40, height: 40 }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt="Transaction Speed"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <Typography variant="h2" component="h2">
                    {title}
                </Typography>
                <p style={{ /*border: '1px solid black', padding: '10px' */ }}>
                    {paragraph}
                </p>
            </Box>
        </Container>
    )
}
export default TileExplainer;