import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonUniversal from "../components/ButtonUniversal";

import ADMenu from "../components/ADMenu";
import TileAddedMerchant from "../components/TileAddedMerchant";

import FotoBluePig from '../img/foto-blue-pig.png';
import FotoPolis from '../img/foto-polis.png';

import IconPlus from '../icons/ico-btn-plus.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";

type ADMyMerchantsProps = {

};

const ADMyMerchants: React.FC<ADMyMerchantsProps> = ({ }) => {
    // State
    const user = useSelector((state: RootState) => state.misc.user)
    const merchants = useSelector((state: RootState) => state.data.merchants)

    // Data slicing
    let uid = user?.uid
    const myMerchants = merchants?.filter((merchant) => merchant.properties.owner === uid);

    console.log("cnt(myMerchants): " + myMerchants?.length)

    const FuncAddSpot = (): Promise<void> => {
        console.log("AddSpot")
        return Promise.resolve();
    }

    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added spots
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal icon={IconPlus} side="L" title="Add spot" color="#F23CFF" textColor="white" actionDelegate={FuncAddSpot} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            {myMerchants?.map((merchant, index) => (
                                <Grid item xs={4} key={index}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/*<TileAddedMerchant
                                        likes={merchant.likes}
                                        image={merchant.image}
                                        tags={merchant.tags}
                                        title={merchant.title}
                                        address={merchant.address}
                                    />*/}
                                    <TileAddedMerchant likes={"12"} tile={merchant.properties}/>
                                </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ADMyMerchants;