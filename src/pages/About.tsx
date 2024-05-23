import React from 'react';
import Typography from '@mui/material/Typography';


function About() {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                About LN map
            </Typography>
            {/*<p>This is <u>About Page</u> of Lightning Prague map.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>*/}
            <p>Bitcoin Lightning Network (LN) is a banger technology that allows instant cheap payments by Bitcoin locked in widely accepted <b>Layer 2</b>.</p>
            <p>Our endeavor is to get together all places in Prague that are accepting Lightning as a means of payment. We want to have the best up-to-date list of places, where you can enjoy coffee, beer or pay for goods or services in Prauge. We have a list of e-shops as well, since we want to support adoption of Lightning and not all people accepting Lightning are cafés or similar.</p>
        </React.Fragment>
    )
}
export default About;