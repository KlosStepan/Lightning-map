import React from "react";
// Components
import ADMenu from "../components/ADMenu";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

type ADTestAwsSesProps = {
    //
};

const ADTestAwsSes: React.FC<ADTestAwsSesProps> = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && (
                    <Grid item xs={3}>
                        <Box sx={{ padding: 2 }}>
                            <ADMenu />
                        </Box>
                    </Grid>
                )}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h1" component="h1">
                            Test AWS SES
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            This is the boilerplate for the Test AWS SES page.
                        </Typography>
                        {/* Add your SES test logic/components here */}
                    </Box>
                </Grid>
            </Grid>
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default ADTestAwsSes;