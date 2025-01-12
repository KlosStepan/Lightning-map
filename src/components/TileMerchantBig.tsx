import React from "react";
//MUI
import Box from '@mui/material/Box';
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from "@mui/material";
//Components
import ButtonUniversal from "./ButtonUniversal";
import TagMerchant from "./TagMerchant";
import TagSocialLink from "./TagSocialLink";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
//Icons
import closeIcon from '../icons/close.png';
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningNumber from "../icons/IconLightningNumber";
//Redux
import { useDispatch } from 'react-redux';
import { setSelected } from "../redux-rtk/mapFilteringSlice";

//Fake images
import dummyImgBigTile from '../img/image-1-3.png';

const containerOuterStyle = {
    padding: '16px 12px',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
    maxWidth: '100% !important'
};

const containerInnerStyle = {
    bgcolor: '#ffffff',
    gap: '20px',
};

const iconStyle = {
    width: 18,
    height: 18,
};


//TODO - tile.image be base64
type TileMerchantBigProps = {
    tile: IMerchantTile; 
};

const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ tile }) => {
    const dispatch = useDispatch();

    const FuncReport = (): Promise<void> => {
        console.log("Report merchant");
        return Promise.resolve();
    };
    // Inside the component
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ ...containerInnerStyle }}>
                <Grid container spacing={2}>
                {/* Image section */}
                <Grid item xs={12} sm={6}>
                    <CardMedia
                    component="img"
                    image={dummyImgBigTile}
                    alt={tile.title}
                    />
                </Grid>

                {/* Content section */}
                <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {tile.tags.map((tag: string) => (
                        <TagMerchant key={tag} tag={tag} />
                        ))}
                    </div>
                    {!isMobile && (
                    <div onClick={() => dispatch(setSelected(null))}>
                        <Box
                        component="img"
                        src={closeIcon}
                        alt="Close Icon"
                        sx={iconStyle}
                        style={{ cursor: 'pointer', opacity: 1 }}
                        />
                    </div>)}
                    </div>
                    <Typography variant="h1" component="h2" sx={{ textAlign: 'left', mt: 1 }}>
                    {tile.title}
                    </Typography>
                    <Typography sx={{ textAlign: 'left', fontSize: '16px', mt: 1, color: '#6B7280' }}>
                    {`${tile.address.address} ${tile.address.city} ${tile.address.postalCode}`}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', fontFamily: 'IBM Plex Sans Condensed', color: '#404040' }}>
                    {tile.description}
                    </Typography>
                    <div>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'PixGamer', fontSize: 24, color: '#6B7280', display: 'inline' }}>
                        Socials
                    </Typography>
                    &nbsp;
                    {tile.socials.map((social: ISocial, index: number) => (
                        <TagSocialLink key={index} social={social} />
                    ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <ButtonUniversal
                        icon={IconExclamationMark}
                        side="L"
                        title="Report"
                        color="white"
                        textColor="#BEBEBE"
                        actionDelegate={FuncReport}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconLightningNumber number="777" scale={1.1} />
                        <span>&nbsp; &nbsp;</span>
                        <ButtonUniversal
                        side="L"
                        title="Navigate"
                        color="#F23CFF"
                        textColor="white"
                        actionDelegate={() => console.log("TODO NAVIGATE funct()")}
                        />
                    </div>
                    </div>
                </Grid>
                </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default TileMerchantBig;
