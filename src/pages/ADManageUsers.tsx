import React from "react";
//Components
import ADMenu from "../components/ADMenu";
//MUI
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

type ADManageUsersProps = {
    //
};

const ADManageUsers: React.FC<ADManageUsersProps> = () => {
    //Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    return(
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Manage Users of Lightning Everywhere
                                </Typography>
                            </Grid>
                            {/*<Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    title="Edit"
                                    color={ButtonColor.Pink}
                                    //color="#F23CFF"
                                    hoverColor={ButtonColor.PinkHover}
                                    //hoverColor="#DA16E3"
                                    textColor="white"
                                    actionDelegate={()=>{}}
                                />
                            </Grid>*/}
                        </Grid>
                        <div>-list of users-</div>
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>     
    );
};

export default ADManageUsers