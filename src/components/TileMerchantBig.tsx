import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import ButtonUniversal from "./ButtonUniversal";
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningNumber from "../icons/IconLightningNumber";
import TagMerchant from "./TagMerchant";
import TagSocialLink from "./TagSocialLink";
import { IMerchantTile/*, ISocial*/ } from "../ts/IMerchant"; // Import the IMerchantTile type
import ISocial from "../ts/ISocial";
import dummyImgBigTile from '../img/image-1-3.png';
import closeIcon from '../icons/close.png';
//Redux
import { useDispatch } from 'react-redux';
//
import { setSelected } from "../redux-rtk/mapFilteringSlice";

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

const iconStyle = {
    width: 18, // Adjust icon size as needed
    height: 18,
};

//TODO - tile.image be base64
type TileMerchantBigProps = {
    tile: IMerchantTile; 
};

const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ tile }) => {
    const dispatch = useDispatch();

    const FuncReport = (): Promise<void> => {
        console.log("Report");
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                    <Grid container spacing={2}>
                        {/* Image section - 40% width */}
                        <Grid item xs={6}>
                            <CardMedia
                                component="img"
                                //TODO 
                                image={dummyImgBigTile}
                                alt={tile.title}
                            />
                        </Grid>
                        {/* Content section - 60% width */}
                        <Grid item xs={6}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                {tile.tags.map((tag: string) => (
                                <TagMerchant key={tag} tag={tag} />
                                ))}
                            </div>

                            <div
                                onClick={() => dispatch(setSelected(null))}
                            >
                                <Box
                                    component="img"
                                    src={closeIcon}
                                    alt="Custom Search Icon"
                                    sx={iconStyle}
                                    style={{
                                        cursor: 'pointer',    // Shows pointer cursor on hover
                                        //transition: 'opacity 0.3s ease', // Smooth transition effect for hover
                                        opacity: 1,
                                    }}
                                />
                            </div>

                        </div>
                            <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                                {tile.title}
                            </Typography>
                            <p style={{ textAlign: 'left', fontSize: '12px' }}>
                                {`${tile.address.address} ${tile.address.city} ${tile.address.postalCode}`}
                            </p>
                            <p style={{ fontSize: '14px' }}>
                                {tile.description}
                            </p>
                            <div>Socials &nbsp;
                                {tile.socials.map((social: ISocial) => (
                                    <TagSocialLink social={social}/>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side="L"
                                    title="Report"
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport} // Placeholder action; replace as needed
                                />
                                <IconLightningNumber number={"777"} scale={0.9} /> {/* Replace "777" with actual likes if available */}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default TileMerchantBig;
