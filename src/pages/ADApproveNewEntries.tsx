import React, { useEffect, useState } from "react";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileTypeMerchant from '../components/TileTypeMerchant';
//Firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { Firestore, QuerySnapshot, DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
//TypeScript
import IMerchant from "../ts/IMerchant";
import IEshop from "../ts/IEeshop";
//Pwnspinner
import { Pwnspinner } from "pwnspinner";

type ADApproveNewEntriesProps = {
//
};

const ADApproveNewEntries: React.FC<ADApproveNewEntriesProps> = ({ }) => {
    //Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    //States for freshly pulled out Merchants and E-shops
    const [allMerchants, setAllMerchants] = useState<IMerchant[] | null>(null);
    const [allEshops, setAllEshops] = useState<IEshop[] | null>(null);
    useEffect(() => {
        const getAllMerchants = async (db: Firestore) => {
            const allMerchantsSnapshot: QuerySnapshot<DocumentData>  = await getDocs(query(collection(db, 'merchants')));
            const allMerchantsList = allMerchantsSnapshot.docs.map((doc: DocumentData) => doc.data());
            //DEBUG - mby
            setAllMerchants(allMerchantsList);
        }
        const getAllEshops = async (db: Firestore) => {
            const allEshopsSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db, 'eshops')));
            const allEshopsList = allEshopsSnapshot.docs.map((doc: DocumentData) => doc.data());
            //DEBUG - mby
            setAllEshops(allEshopsList);
        }
        getAllMerchants(db);
        getAllEshops(db);
    }, [])
    return(
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Approve New Entries
                                </Typography>
                            </Grid>
                            {/*<Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal title="Edit" color="#F23CFF" textColor="white" actionDelegate={()=>{}} />
                            </Grid>*/}
                        </Grid>
                        <Grid>
                            <div>-list of places with <u>|0|</u>(on top) or <u>|1|</u> switch-</div>
                            <div>&nbsp;</div>
                        </Grid>
                        <Grid container spacing={2}>
                            {/* Left List: Merchants */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h1" component="h1">Spots</Typography>
                                {allMerchants === null ? (
                                    <Pwnspinner color="#F23CFF" speed={0.7} thickness={2} />
                                ) : (
                                    <List>
                                        {allMerchants
                                            .sort((a, b) => Number(a.properties.visible) - Number(b.properties.visible)) // Sort pending first
                                            .map((merchant) => (
                                                <ListItem key={merchant.properties.id}>
                                                    <ListItemText
                                                        primary={`${merchant.properties.visible ? "✅" : "🔴"} ${merchant.properties.title}`}
                                                    />
                                                </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Grid>

                            {/* Right List: EShops */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h1" component="h1">E-Shops</Typography>
                                {allEshops === null ? (
                                    <Pwnspinner color="#F23CFF" speed={0.7} thickness={2} />
                                ) : (
                                    <List>
                                        {allEshops
                                            .sort((a, b) => Number(a.visible) - Number(b.visible)) // Sort pending first
                                            .map((eshop) => (
                                                <ListItem key={eshop.id}>
                                                    <ListItemText
                                                        primary={`${eshop.visible ? "✅" : "🔴"} ${eshop.name}`}
                                                    />
                                                </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* <span>ADApproveNewEntries.tsx</span> */}
        </React.Fragment>     
    )
}
export default ADApproveNewEntries