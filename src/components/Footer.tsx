import React from "react"
import { Grid, Typography } from '@mui/material';

const footerStyling = {
    marginTop: '20px',
}

type FooterProps = {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ ...footerStyling }}>
                {/* First part: 1/2 */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" /*align="center"*/>Experience the Power of
                        Lightning Network Everywhere</Typography>
                </Grid>
                {/* Second part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h2" /*align="center"*/>Support</Typography>
                    <Typography variant="h3" align="center">support@lightningeverywhere.com</Typography>
                </Grid>
                {/* Third part: 1/4 */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h2" align="center">Follow us on</Typography>
                    <Typography variant="h3" align="center">Instagram</Typography>
                    <Typography variant="h3" align="center">Threads</Typography>
                    <Typography variant="h3" align="center">Threads</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Footer;