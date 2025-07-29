import React, { useEffect, useState } from "react";
// MUI
import { 
    Typography, Grid, List, ListItem, ListItemText, Box, Paper, 
    useMediaQuery, useTheme, Switch, ListItemSecondaryAction 
} from '@mui/material';
// Components
import ADMenu from "../components/ADMenu";
import { Pwnspinner } from "pwnspinner";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../components/Firebase";
// TypeScript
import IMerchant from "../ts/IMerchant";
import IEshop from "../ts/IEshop";

const ADApproveNewEntries: React.FC = () => {
    // Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    // State for merchants and e-shops
    const [allMerchants, setAllMerchants] = useState<IMerchant[] | null>(null);
    const [allEshops, setAllEshops] = useState<IEshop[] | null>(null);

    useEffect(() => {
        const getAllMerchants = async () => {
            const allMerchantsSnapshot = await getDocs(query(collection(db, 'merchants')));
            const allMerchantsList = allMerchantsSnapshot.docs.map(doc => doc.data() as IMerchant);
            setAllMerchants(allMerchantsList);
        };

        const getAllEshops = async () => {
            const allEshopsSnapshot = await getDocs(query(collection(db, 'eshops')));
            const allEshopsList = allEshopsSnapshot.docs.map(doc => doc.data() as IEshop);
            setAllEshops(allEshopsList);
        };

        getAllMerchants();
        getAllEshops();
    }, []);

    // Toggle function for visibility
    const toggleVisibility = (type: "merchant" | "eshop", id: string) => {
        if (type === "merchant") {
            setAllMerchants(prev => 
                prev ? prev.map(m => m.properties.id === id ? 
                    { ...m, properties: { ...m.properties, visible: !m.properties.visible } } : m
                ) : null
            );
        } else {
            setAllEshops(prev => 
                prev ? prev.map(e => e.id === id ? 
                    { ...e, visible: !e.visible } : e
                ) : null
            );
        }
    };

    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box sx={{ padding: 2 }}>
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h1" component="h1">Approve New Entries</Typography>
                        
                        <Grid container spacing={3} sx={{ marginTop: 2 }}>
                            {/* Merchants */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                                    <Typography variant="h2" component="h2">Spots</Typography>
                                    {allMerchants === null ? (
                                        <Pwnspinner color="#F23CFF" speed={0.7} thickness={2} />
                                    ) : (
                                        <List>
                                            {allMerchants
                                                .sort((a, b) => Number(a.properties.visible) - Number(b.properties.visible))
                                                .map((merchant) => (
                                                    <ListItem key={merchant.properties.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                                        <ListItemText
                                                            primary={`${merchant.properties.name}`}
                                                            secondary={merchant.properties.visible ? "Visible" : "Hidden"}
                                                            sx={{
                                                                color: 'black', // Names are black
                                                            }}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Switch 
                                                                checked={merchant.properties.visible} 
                                                                onChange={() => toggleVisibility("merchant", merchant.properties.id)}
                                                                sx={{
                                                                    '&.Mui-checked': {
                                                                        color: 'green', // Green for visible
                                                                    },
                                                                    '&.Mui-checked + .MuiSwitch-track': {
                                                                        backgroundColor: 'green', // Track color for visible
                                                                    },
                                                                    '&.MuiSwitch-root': {
                                                                        color: merchant.properties.visible ? 'green' : 'red', // Red when invisible
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Paper>
                            </Grid>

                            {/* EShops */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                                    <Typography variant="h2" component="h2">E-Shops</Typography>
                                    {allEshops === null ? (
                                        <Pwnspinner color="#F23CFF" speed={0.7} thickness={2} />
                                    ) : (
                                        <List>
                                            {allEshops
                                                .sort((a, b) => Number(a.visible) - Number(b.visible))
                                                .map((eshop) => (
                                                    <ListItem key={eshop.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                                        <ListItemText
                                                            primary={`${eshop.name}`}
                                                            secondary={eshop.visible ? "Visible" : "Hidden"}
                                                            sx={{
                                                                color: 'black', // Names are black
                                                            }}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Switch 
                                                                checked={eshop.visible} 
                                                                onChange={() => toggleVisibility("eshop", eshop.id)}
                                                                sx={{
                                                                    '&.Mui-checked': {
                                                                        color: 'green', // Green for visible
                                                                    },
                                                                    '&.Mui-checked + .MuiSwitch-track': {
                                                                        backgroundColor: 'green', // Track color for visible
                                                                    },
                                                                    '&.MuiSwitch-root': {
                                                                        color: eshop.visible ? 'green' : 'red', // Red when invisible
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADApproveNewEntries;
