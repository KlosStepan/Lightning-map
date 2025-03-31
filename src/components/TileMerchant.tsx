import React from "react";
// MUI
import Box from '@mui/material/Box';
import { CardMedia, Container, Typography } from '@mui/material';
// Components
import TagMerchant from "./TagMerchant";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";
// Icons
import IconLightningNumber from "../icons/IconLightningNumber";

// Fake images
//import dummyImgTile1 from '../img/image-1-4.png';
//import dummyImgTile2 from '../img/image-1-5.png';

type TileMerchantProps = {
    likes: string;
    tile: IMerchantTile;
    index: number;
    outOfBusiness?: boolean; // New flag
};

const TileMerchant: React.FC<TileMerchantProps> = ({ likes, tile, index, outOfBusiness = false }) => {

    // Determine grayscale effect and reduced effects based on `outOfBusiness` flag
    const containerOuterStyle = {
        padding: '0px 0px 0px 0px !important',
        gap: '10px',
        borderRadius: '16px',
        backgroundColor: outOfBusiness ? '#d3d3d3' : 'white', // Set background to gray if out of business
        filter: outOfBusiness ? 'grayscale(100%)' : 'none', // Apply grayscale effect
        opacity: outOfBusiness ? 0.5 : 1, // Reduce opacity for closed businesses
        pointerEvents: outOfBusiness ? 'none' : 'auto', // Disable interaction if out of business
    };

    // Upper part of Tile
    const containerInnerStyleUp = {
        position: 'relative',
        height: '50%',
        width: '100%',
    };

    const topRight = {
        position: 'absolute',
        top: 8,
        right: 8,
    };

    const leftBottom = {
        position: 'absolute',
        bottom: 8,
        left: 8,
    };

    // Bottom part of Tile
    const containerInnerStyleDown = {
        padding: '6px 10px 2px 10px',
        margin: '8px 0px 0px 0px',
        textAlign: 'left',
    };

    /*let img = null;
    if (tile.images[0] === "dummyImgTile1") {
        img = dummyImgTile1;
    } else if (tile.images[0] === "dummyImgTile2") {
        img = dummyImgTile2;
    }*/

    return (
        <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
            <Box sx={{ ...containerInnerStyleUp }}>
                {/*<CardMedia
                    component="img"
                    //image={tile.images[0] === "dummyImgTile1" ? dummyImgTile1 : tile.images[0] === "dummyImgTile2" ? dummyImgTile2 : tile.images[0]}
                    alt={tile.name}
                />*/}
                {/*{tile.images.length > 1 ? (
                    <div>Some gallery, TODO yet</div> // Replace this with your gallery component later
                ) : (
                    <CardMedia
                        component="img"
                        image={tile.images[0]}
                        alt={tile.name}
                    />
                )}*/}
                {tile.images.length < 1 ? (
                    <div>--picture missing--</div> /* TODO dummy Merchant img*/
                ) : (
                    <CardMedia
                        component="img"
                        image={tile.images[0]}
                        alt={tile.name}
                    />
                )}
                <Box sx={{ ...topRight }}>
                    <IconLightningNumber number={likes} />
                </Box>
                <Box sx={{ ...leftBottom }}>
                    {tile.tags.map((tag: string) => (
                        <TagMerchant tag={tag} />
                    ))}
                </Box>
            </Box>
            {/*DEBUG NUMBER OF PHOTOS*/}
            {/*<span>{tile.images.length}</span>*/}
            <Box sx={{ ...containerInnerStyleDown }}>
                <Typography variant="h2" component="h2">
                    {tile.name}
                </Typography>
                <p style={{
                    fontSize: '16px',
                    color: outOfBusiness ? '#9e9e9e' : '#6B7280', // Make text lighter if out of business
                    fontFamily: 'IBM Plex Sans Condensed',
                    marginTop: '2px'
                }}>
                    {tile.address.address + ' ' + tile.address.city + ' ' + tile.address.postalCode}
                </p>
            </Box>
        </Container>
    );
};

export default TileMerchant;
