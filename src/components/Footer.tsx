import React from "react"
import { Grid, Typography } from '@mui/material';
import { BorderTop } from "@mui/icons-material";

const footerStyling = {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'left',
    //borderTop: '1px solid black',
}

type FooterProps = {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <React.Fragment>
            <div style={{ marginTop: '40px', borderTop: '1px solid #808080' }}></div>
            <Grid container spacing={2} sx={{ ...footerStyling }}>
                {/* First part: 1/2 */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" /*align="center"*/>Experience the Power of
                        Lightning Network Everywhere</Typography>
                </Grid>
                {/* Second part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h2" /*align="center"*/>Support</Typography>
                    <Typography variant="h3">support@lightningeverywhere.com</Typography>
                </Grid>
                {/* Third part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h2">Follow us on</Typography>
                    <Typography variant="h3">Instagram</Typography>
                    <Typography variant="h3">Threads</Typography>
                    <Typography variant="h3">Threads</Typography>
                </Grid>
                {/*</Grid>
            <Grid container spacing={2}>*/}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" component="h3">2024 © Lightning. Everywhere.</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h3" component="h3">GDPR</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h3" component="h3">design: smékal</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Footer;