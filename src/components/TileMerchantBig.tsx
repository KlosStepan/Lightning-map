import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconExclamationMark from "../icons/IconExclamationMark";
import IconLightningNumber from "../icons/IconLightningNumber";
//
import TagMerchant from "./TagMerchant";
import TagSocialLink from "./TagSocialLink";

const containerOuterStyle = {
    padding: '16px 12px',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
};

const containerInnerStyle = {
    gap: '20px',
};

type TileMerchantBigProps = {
    image: string;
    categories: string[];
    title: string;
    address: string;
    description: string;
    socials: string[];
    likes: string;
};

const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ image, categories, title, address, description, socials, likes }) => {
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                    <Grid container spacing={2}>
                        {/* Image section - 40% width */}
                        <Grid item xs={6}>
                            <CardMedia
                                component="img"
                                style={{
                                    //margin: '24px 0' // 20px top and bottom margin, 0 left and right margin
                                }}
                                image={image}
                                alt={title}
                            />
                        </Grid>
                        {/* Content section - 60% width */}
                        <Grid item xs={6}>
                            <TagMerchant tag={"Food & Drinks"}/>
                            <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                                {title}
                            </Typography>
                            <p style={{ textAlign: 'left', fontSize: '12px' }}>
                                {address}
                            </p>
                            <p>
                                {description}
                            </p>
                            <div>Socials:
                                <TagSocialLink social="Web" link={"https://www.web.com/"}/>
                                <TagSocialLink social="FB" link={"https://www.fb.com/"}/>
                                <TagSocialLink social="IG" link={"https://www.ig.com/"}/>

                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <IconExclamationMark />
                                &nbsp;
                                <IconLightningNumber number={likes} />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default TileMerchantBig;
