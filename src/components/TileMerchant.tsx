import React from "react";
// Components
import TagMerchant from "./TagMerchant";
// MUI
import Box from '@mui/material/Box';
import { CardMedia, Container, Typography } from '@mui/material';
// Redux + RTK
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";
// Utils
import { getBackendImageUrl } from "../utils/image";

// Icons
import IconLightningNumber from "../icons/IconLightningNumber";

type TileMerchantProps = {
    likes: string;
    tile: IMerchantTile;
    index: number;
    outOfBusiness?: boolean;
};

const TileMerchant: React.FC<TileMerchantProps> = ({ likes, tile/*, index*/, outOfBusiness = false }) => {
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    
    // Determine grayscale effect and reduced effects based on `outOfBusiness` flag
    const containerOuterStyle = {
        padding: '0px 0px 0px 0px !important',
        gap: '10px',
        borderRadius: '16px',
        backgroundColor: outOfBusiness ? '#d3d3d3' : 'white',
        filter: outOfBusiness ? 'grayscale(100%)' : 'none',
        opacity: outOfBusiness ? 0.5 : 1,
        pointerEvents: outOfBusiness ? 'none' : 'auto',
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

    return (
        <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
            <Box sx={{ ...containerInnerStyleUp }}>
                {tile.images.length < 1 ? (
                    <div>--picture missing--</div> /* TODO dummy Merchant img*/
                ) : (
                    <CardMedia
                        component="img"
                        image={getBackendImageUrl(tile.images[0], apiBaseUrl || "", "merchant", false)}
                        alt={tile.name}
                        sx={{
                            objectFit: 'cover', 
                            height: '164px',
                            width: '100%',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                        }}
                    />
                )}
                <Box sx={{ ...topRight }}>
                    <IconLightningNumber number={likes} scale={1} />
                </Box>
                <Box sx={{ ...leftBottom }}>
                    {tile.tags.map((tag: string) => (
                        <TagMerchant tag={tag} />
                    ))}
                </Box>
            </Box>
            <Box sx={{ ...containerInnerStyleDown }}>
                <Typography variant="h2" component="h2">
                    {tile.name}
                </Typography>
                <p style={{
                    fontSize: '16px',
                    color: outOfBusiness ? '#9e9e9e' : '#6B7280',
                    fontFamily: 'IBM Plex Sans Condensed',
                    marginTop: '2px',
                }}>
                    {tile.address.address + ' ' + tile.address.city + ' ' + tile.address.postalCode}
                </p>
            </Box>
        </Container>
    );
};

export default TileMerchant;
