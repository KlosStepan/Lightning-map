import React from "react";
//Components
import HomepageEvidenceSection from "../components/HomepageEvidenceSection";
import WhyLightning from "../components/WhyLightning";
import MiddleOfHomepage from "../components/MiddleOfHomepage";
import Footer from "../components/Footer";
//MUI
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Redux
import { RootState } from "../redux-rtk/store";
import { useSelector } from 'react-redux';
// TypeScript 
import IEshop from '../ts/IEshop';

import IMerchant from "../ts/IMerchant";

type HomepageProps = {
    //
};

const Homepage: React.FC<HomepageProps> = () => {
    const merchants = useSelector((state: RootState) => state.data.merchants)
    ////console.log("merchants")
    ////console.log(merchants)
    const eshops = useSelector((state: RootState) => state.data.eshops)
    ////console.log("eshops")
    ////console.log(eshops)

    // Count only visible merchants
    const visibleMerchantsCount = merchants ? merchants.filter((m: IMerchant) => m.properties.visible).length : undefined;
    // Count only visible e-shops
    const visibleEshopsCount = eshops ? eshops.filter((e: IEshop) => e.visible).length : undefined;

    return (
        <React.Fragment>
            <React.Fragment>
                {/*<CssBaseline />*/}
                <Container maxWidth="sm">
                    {/*<CssBaseline />*/}
                    <Box sx={{ /*bgcolor: '#cfe8fc', height: '20vh'*/ }}>
                        <Typography variant="h1" component="h1">
                            Experience the Power of
                            Lightning Network Everywhere </Typography>
                        <p>Find cafés, shops and e-shops that take Bitcoin over Lightning. Pay in a second.</p>
                    </Box>
                    <HomepageEvidenceSection
                        //merchants={merchants ? merchants.length : undefined}
                        merchants={visibleMerchantsCount}
                        //eshops={eshops ? eshops.length : undefined}
                        eshops={visibleEshopsCount}
                    />
                    <p>&nbsp;</p>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <WhyLightning/>
            </React.Fragment>
            <React.Fragment>
                <div>&nbsp;</div>
                <MiddleOfHomepage />
            </React.Fragment>
            
            <Footer />
        </React.Fragment>
    );
};

export default Homepage;