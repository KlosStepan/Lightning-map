import React from "react"
import { Grid, Typography } from '@mui/material';
import { BorderTop } from "@mui/icons-material";
import HrGreyCustomSeparator from "./HrGreyCustomSeparator";

const footerStyling = {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'left',
    //borderTop: '1px solid black',
}

type FooterProps = {
    //
}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <React.Fragment>
            <HrGreyCustomSeparator/>
            <Grid container spacing={2} sx={{ ...footerStyling }}>
                {/* First part: 1/2 */}
                <Grid item xs={12} md={6}>
                    <Typography component="h1" variant="h1" >
                    Experience the Power of Lightning Network Everywhere
                    </Typography>
                </Grid>
                {/* Second part: 1/4 */}
                <Grid item xs={12} md={3}>
                <Typography component="h1" variant="h3" sx={{ color: '#6B7280' }}>Support</Typography>
                    {/** */}
                    <Typography component="h2" variant="h2">support@lightningeverywhere.com</Typography>
                </Grid>
                {/* Third part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography component="h1" variant="h3" sx={{ color: '#6B7280' }}>Follow us on</Typography>
                    {/** */}
                    <Typography component="h2" variant="h2">Instagram</Typography>
                    <Typography component="h2" variant="h2">X</Typography>
                    <Typography component="h2" variant="h2">Threads</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="h3" variant="h3">design: smékal</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography component="h3" variant="h3">GDPR</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography component="h3" variant="h3">2024 © Lightning. Everywhere.</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Footer;