import React from "react"
//MUI
import { Grid, Typography } from '@mui/material';
//
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

const Footer: React.FC<FooterProps> = ( ) => {
    return (
        <React.Fragment>
            <HrGreyCustomSeparator/>
            <Grid container spacing={2} sx={{ ...footerStyling }}>
                {/* First part: 1/2 */}
                <Grid item xs={12} md={6}>
                    <Typography component="h1" variant="h1" >
                    Experience the Power of<br/> Lightning Network Everywhere
                    </Typography>
                    {/*<Typography component="h1" variant="h3" sx={{ color: '#6B7280' }}>Out Domains</Typography>*/}
                    {/*<Typography component="h2" variant="h2">LightningEverywhere.com</Typography>
                    <Typography component="h2" variant="h2">&gt; Lightning-Everywhere.com</Typography>
                    <Typography component="h2" variant="h2">&gt; LightningEverywhere.io</Typography>
                    <Typography component="h2" variant="h2">&gt; Lightning-Everywhere.io</Typography>*/}
                </Grid>
                {/* Second part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography component="h1" variant="h3" sx={{ color: '#6B7280' }}>Write us</Typography>
                    <Typography component="h2" variant="h2">stepan@lightningeverywhere.com</Typography>
                    <Typography component="h2" variant="h4">// ^don't msg yet, might not be working</Typography>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    {/*<Typography component="h6" variant="h6">
                        Backend API: &nbsp;
                        <a href="https://lightning-everywhere.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            lightning-everywhere.com/
                        </a>
                    </Typography>*/}
                </Grid>
                {/* Third part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography component="h1" variant="h3" sx={{ color: '#6B7280' }}>Follow us on</Typography>
                    {/** */}
                    <Typography component="h2" variant="h2">Instagram</Typography>
                    <Typography component="h2" variant="h2">X</Typography>
                    <Typography component="h2" variant="h2">LinkedIN</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="h3" variant="h3">2025 © Lightning. Everywhere.</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography component="h6" variant="h6">
                        GDPR
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography component="h3" variant="h3">design: {/*<a href="https://filipsmekal.cz/"target="_blank">smékal</a>*/}smékal</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Footer;