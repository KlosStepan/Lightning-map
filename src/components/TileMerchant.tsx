import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Typography } from '@mui/material';
//
import IconExclamationMark from "../icons/IconExclamationMark";
import IconLightningNumber from "../icons/IconLightningNumber";

import TagMerchant from "./TagMerchant";
import { IMerchantTile } from "../ts/IMerchant";

//
import dummyImgTile1 from '../img/image-1-4.png';
import dummyImgTile2 from '../img/image-1-5.png';

const containerOuterStyle = {
    //padding: 0px 8px 0px 0px !important; //L ... index%3 = 0
    //padding: 0px 4px 0px 4px !important; //mid . index%3 = 1
    //padding: 0px 0px 0px 8px !important; //R ... index%3 = 2
    padding: '0px 0px 0px 0px !important',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
};

//Upper part of Tile
const containerInnerStyleUp = {
    position: 'relative',
    height: '50%',
    width: '100%',
};

const topRight = {
    position: 'absolute',
    top: 8,
    right: 8,
}

const leftBottom = {
    position: 'absolute',
    bottom: 8,
    left: 8,
}

//Bottom part of Tile
const containerInnerStyleDown = {
    padding: '6px 10px 2px 10px',
    textAlign: 'left',
};

//TODO - tile.image be base64
type TileMerchantProps = {
    likes: string
    tile: IMerchantTile
    index: number
};

const TileMerchant: React.FC<TileMerchantProps> = ({likes, tile, index }) => {
    let img = null;
    if (tile.image=="dummyImgTile1") {
        img = dummyImgTile1;
    } else if(tile.image=="dummyImgTile2") {
        img = dummyImgTile2;
    }

    return (
        <Container
            maxWidth="sm"
            sx={{ 
                ...containerOuterStyle, 
            }}
        >
            <Box sx={{ ...containerInnerStyleUp}}>
                <CardMedia
                    component="img"
                    //TODO vv fix
                    image={tile.image === "dummyImgTile1" ? dummyImgTile1 : tile.image === "dummyImgTile2" ? dummyImgTile2 : tile.image}
                    alt={tile.title}
                />
                <Box sx={{ ...topRight }}>
                    <IconLightningNumber number={likes} />
                </Box>
                <Box sx={{ ...leftBottom }}>
                    {tile.tags.map((tag: string) => (
                        <TagMerchant tag={tag}/>
                    ))}
                </Box>
            </Box>
            <Box sx={{ ...containerInnerStyleDown }}>
                <Typography variant="h3" component="h2" >
                    {tile.title}
                </Typography>
                <p style={{ fontSize: '12px' }}>{tile.address.address + ' ' + tile.address.city + ' ' + tile.address.postalCode}</p>
            </Box>
        </Container>
    );
};

export default TileMerchant;
