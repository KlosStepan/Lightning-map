import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";

function ADMyAccount() {
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Typography variant="h1" component="h1">
                            My Account
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ADMyAccount;