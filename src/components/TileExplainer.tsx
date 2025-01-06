import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

// Styles for the outer and inner containers
const containerOuterStyle = {
  //padding: '32px 16px 10px 16px', // Ensure padding applies on all breakpoints
  padding: '32px 16px 10px 16px',
  gap: '10px',
  borderRadius: '24px',
  backgroundColor: 'white',
  margin: '10px 0', // Consistent margin
};

const containerInnerStyle = {
  //gap: '20px',
  display: 'flex',
  flexDirection: 'column', // Ensures stacking
};

// Define the type for the props
type TilePitchProps = {
  image?: string;
  title: string;
  paragraph: string;
  breakImageAndTitle?: boolean; // New prop to control the layout
};

// Define the component using the defined props type
const TileExplainer: React.FC<TilePitchProps> = ({
  image,
  title,
  paragraph,
  breakImageAndTitle = true, // Default value set to true
}) => {
  return (
    <Container maxWidth="sm" sx={containerOuterStyle}>
      <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
        {breakImageAndTitle ? (
          <>
            {image && (
              <div style={{ width: 40, height: 40 }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt="Transaction Speed"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {image && (
              <div style={{ width: 40, height: 40, marginRight: '8px' }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt="Transaction Speed"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
          </div>
        )}
        <p>{paragraph}</p>
      </Box>
    </Container>
  );
};

export default TileExplainer;
