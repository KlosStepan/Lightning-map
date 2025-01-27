import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";

type ADMyAccountProps = {

};
//function ADMyAccount() {
const ADMyAccount: React.FC<ADMyAccountProps> = ({ }) => {
    const FuncEdit = (): Promise<void> => {
        console.log("Edit")
        return Promise.resolve();
    }
    //Phone detect section 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}

                {/* Main Content */}
                <Grid item md={9} xs={12}>
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
            {isPhone && <ADMenu/>}
        </React.Fragment>
    )
}
export default ADMyAccount;