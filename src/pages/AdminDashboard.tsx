import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenuButton from "../components/ADMenuButton";


function AdminDashboard() {
    return (
        <React.Fragment>
            {/*<Typography variant="h1" component="h1">
                Welcome back
            </Typography>*/}
            < Grid container >
                {/* Sidebar */}
                < Grid item xs={2} >
                    <Box
                        sx={{
                            //height: '100vh', // Full height of the viewport
                            //backgroundColor: '#f4f4f4', // Background color for the sidebar
                            padding: 2, // Padding inside the sidebar
                        }}
                    >
                        <ADMenuButton icon="ico.png" title="Dashboard" path="/admin/dashboard" />
                        <ADMenuButton icon="ico.png" title="My spots" path="/admin/my-spots" />
                        <ADMenuButton icon="ico.png" title="My e-shops" path="/admin/my-eshops" />
                        <ADMenuButton icon="ico.png" title="My account" path="/admin/my-account" />

                        <ul>
                            <li>|<u>Dashboard</u>|</li>
                            <li>|<u>My spots</u>|</li>
                            <li>|<u>My e-shops</u>|</li>
                            <li>|<u>My account</u>|</li>
                            {/* Add more menu items here */}
                        </ul>
                    </Box>
                </Grid >

                {/* Main Content */}
                < Grid item xs={10} >
                    <Box
                        sx={{
                            padding: 3, // Padding inside the main content area
                        }}
                    >
                        <Typography variant="h1" component="h1">
                            Welcome back
                        </Typography>
                        <Typography variant="h1" component="h1">
                            Stepan Klos
                        </Typography>
                        <p>This is the main content area.</p>
                        {/* Add more content here */}
                    </Box>
                </Grid >
            </Grid >
        </React.Fragment>

    )
}

export default AdminDashboard;
