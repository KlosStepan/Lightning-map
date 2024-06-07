import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import Button from '@mui/material/Button';
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";

function ADMyAccount() {
    const FuncEdit = (): Promise<void> => {
        console.log("Edit")
        return Promise.resolve();
    }
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
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    My Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal title="Edit" color="#F23CFF" textColor="white" actionDelegate={FuncEdit} />

                            </Grid>
                        </Grid>
                        <div>Some user stuff goes here (depending on auth method I would say)</div>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ADMyAccount;