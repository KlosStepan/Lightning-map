import React from "react";
//Components
import TileEshop from "../components/TileEshop";
import ButtonUniversal from "../components/ButtonUniversal";
//enums
import { ButtonSide } from "../enums";
//MUI
import { Box, Container, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
//TypeScript
import IEshop from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";
import TileMerchant from "../components/TileMerchant";
import TileMerchantBig from "../components/TileMerchantBig";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";

//E-Shop stuff
const tile: IEshop = {
    id: "asd1",
    owner: "EM6jd7CDU4PdHgF7LJTTvyMPNrJ3",
    visible: true,
    name: "Bitcoinovej Kanál ",
    description: "Kicomuv merch Kicomuv merch Kicomuv merch",
    logo: "https://firebasestorage.googleapis.com/v0/b/lightning-everywhere.firebasestorage.app/o/eshop-logos%2FthNQXwffucpx8oS3OakB-Screenshot_20250321_012223.png?alt=media&token=c2cebca5-f985-447a-9759-0936b8778e41",
    country: "CZ",
    url: "https://bitcoinovejkanal.cz/eshop/",
};
//
const handleLikeChange = async (vendorid: string, change: number): Promise<void> => {
    console.log(`Like changed for vendor ${vendorid}: ${change}`);
};

const merchant: IMerchant = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [14.4483471, 50.1033561],
    },
    properties: {
      id: "asd2",
      name: "Paralelní Polis",
      description: "lorem ipsum 2",
      address: {
        address: "Delnicka 43",
        city: "Praha 7",
        postalCode: "170 00",
      },
      images: [
        "https://firebasestorage.googleapis.com/v0/b/lightning-everywhere.firebasestorage.app/o/merchants-photos%2FgnO7T0wxtYB6jGRsztOS-polis1.jpeg?alt=media&token=347c84ab-d120-4ef0-b9d4-2d52e05ed400",
        "https://firebasestorage.googleapis.com/v0/b/lightning-everywhere.firebasestorage.app/o/merchants-photos%2FgnO7T0wxtYB6jGRsztOS-polis2.jpeg?alt=media&token=8042e4cc-16bc-4e59-af9a-29d8d409d7c5",
        "https://firebasestorage.googleapis.com/v0/b/lightning-everywhere.firebasestorage.app/o/merchants-photos%2FgnO7T0wxtYB6jGRsztOS-polis3.jpeg?alt=media&token=895fb62e-86de-4ca1-8427-ef45ae8cc6dd",
        "https://firebasestorage.googleapis.com/v0/b/lightning-everywhere.firebasestorage.app/o/merchants-photos%2FgnO7T0wxtYB6jGRsztOS-polis4.jpeg?alt=media&token=9692ebc4-0414-4be3-b9a8-e1ce2c527bd5",
      ],
      tags: ["Shops", "Services"],
      socials: [
        {
          label: "Web",
          link: "https://www.paralelnipolis.com",
          network: "web",
        },
        {
          label: "FB",
          link: "https://www.facebook.com/paralelnipolis",
          network: "facebook",
        },
        {
          label: "IG",
          link: "https://www.instagram.com/paralelnipolis",
          network: "instagram",
        },
        {
          label: "X",
          link: "https://www.twitter.com/paralelnipolis",
          network: "twitter",
        },
      ],
      owner: "EM6jd7CDU4PdHgF7LJTTvyMPNrJ3",
      visible: true,
    },
  };
  
  

type UIKitProps = {
    propFromApptsx?: boolean;
    propStuff?: string;    
};
//
const UIKit: React.FC<UIKitProps> = ({ propFromApptsx = false, propStuff = "propStuffOK" }) => {
    //
    const dynamicPadding = (index: number) => {
        const spaceBetween = 8; // up and down space
        const spaceTile = 8; // between tiles space
        switch (index % 6) {
          case 0:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px 0px !important` }; // Left-most tile
          case 5:
            return { padding: `${spaceBetween}px 0px ${spaceBetween}px ${spaceTile}px !important` }; // Right-most tile
          default:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px ${spaceTile}px !important` }; // Middle tiles
        }
    };
    //
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                UI Kit {"<UIKit propFromApptsx={true}/>"}
            </Typography>
            <Typography variant="h2" component="h2">
                //{propStuff} //{(propFromApptsx)?"true":"false"}
            </Typography>
            <div>&nbsp;</div>
            <HrGreyCustomSeparator/>
            <React.Fragment>
            <Typography variant="h1" component="h2">
                E-SHOPS TypeScript type, <u>IBaseEntity</u> -&gt; <u>IEshop</u>
            </Typography>
            <div>
                <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer', color: '#6B7280' }}>
                    {'1'} results
                </p>
                <Grid container spacing={2} /*sx={{ marginRight: 0, marginLeft: 0 }}*/>
                    <React.Fragment>
                        {/* sx={isPhone ? {} : dynamicPadding(0)} */}
                        <Grid xs={12} sm={2} key="dummy-0" sx={dynamicPadding(0)}>
                        <TileEshop
                            likes={"0"}
                            tile={tile}
                            showReportButton={true}
                            handleLikeChange={handleLikeChange}
                        />
                        </Grid>
                        {/*<Grid xs={12} sm={2} key="dummy-1" sx={dynamicPadding(1)}>
                        <TileEshop
                            likes={"10"}
                            tile={tile}
                            showReportButton={false}
                            handleLikeChange={handleLikeChange}
                        />
                        </Grid>*/}
                    </React.Fragment>
                </Grid>
            </div>
            <HrGreyCustomSeparator/>
            <Typography variant="h1" component="h2">
                MERCHANTS TypeScript type, <u>IBaseEntity</u> -&gt; <u>IMerchant</u> <br/>
            </Typography>
            <div>&nbsp;</div>
            {/*FROM HERE2*/}
            <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
                <Grid>&nbsp;</Grid>
                <Grid container spacing={2}>
                    <span style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        {'1'} results
                    </span>
                </Grid>
                <Grid>&nbsp;</Grid>
                <Grid container spacing={2}>
                    <TileMerchantBig
                        likes={"0"}
                        tile={merchant.properties}
                        //handleLikeChange={FuncDrillIncrDecrLike}
                    />
                </Grid>
                <Grid>&nbsp;</Grid>
                <Grid container spacing={2}>
                    <React.Fragment>
                        <Grid xs={12} sm={4} key={0} sx={{ ...dynamicPadding(0) }}>
                            <Box
                                onClick={() => null /*dispatch(setSelected(merchant))*/}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'opacity 0.3s ease',
                                    opacity: 1,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                                <TileMerchant likes={"0"} tile={merchant.properties} index={0} />
                            </Box>
                        </Grid>
                    </React.Fragment>
                </Grid>
            </Grid>
            {/*{!isPhone && (*/}
            { true && (
                <Grid item xs={12} sm={5}
                    sx={{
                        display: { xs: 'none', sm: 'block' }, // Hide on mobile, show on larger screens
                    }}
                >
                    <Box style={{ textAlign: 'center' }}>
                        {/*<LeafletMapTwo data={filteredMerchants ?? []} onMerchantSelect={handleMerchantSelect} />*/}
                    </Box>
                </Grid>
            )}
            </Grid>
            {/*TO HERE2*/}
            </React.Fragment>
            <HrGreyCustomSeparator/>
            <React.Fragment>
            <Typography variant="h1" component="h2">
                BUTTONS variants of {"<ButtonUniversal .../>"}<br/>
            </Typography>
            <div>&nbsp;</div>
            <React.Fragment>
            <ButtonUniversal
                    icon={IconPlus}
                    side={ButtonSide.Left}
                    title="Add spot"
                    color="#F23CFF"
                    textColor="white"
                    //actionDelegate={FuncAddSpot}
                    //fullWidth={isPhone ? true :  false }
                  />
            </React.Fragment>
            </React.Fragment>
        </React.Fragment>
    )
};

export default UIKit;