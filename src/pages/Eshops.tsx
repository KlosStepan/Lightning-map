import React, {useState, useMemo, useEffect} from "react";
//Components
import SearchBarVendors from "../components/SearchBarVendors";
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from "../components/TileEshop";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import Footer from "../components/Footer";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Forms
import FormAddEshop from "../forms/FormAddEshop";
//MUI
import { Box, Container, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import Modal from "@mui/material/Modal";
//Redux
import { /*useDispatch,*/ useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Router
import { useNavigate } from "react-router-dom";
//TypeScript
import IEshop from "../ts/IEshop";

//Pwnspinner
import { Pwnspinner } from "pwnspinner";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';

type EshopsProps = {
    //
};

const Eshops: React.FC<EshopsProps> = () => {
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    //
    const user = useSelector((state: RootState) => state.misc.user);
    //
    const eshops = useSelector((state: RootState) => state.data.eshops);
    //const likes = useSelector((state: RootState) => state.data.likes) ?? [];
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());
    // Search: searchText <- from <SearchBarVendors .../>, filteredEshops finds searchText in Eshop
    const [searchText, setSearchText] = useState('');
    const filteredEshops = eshops?.filter((eshop: IEshop) => {
        const fields = [
            eshop.name,
            eshop.description,
            eshop.country,
            eshop.url,
        ];

        const haystack = [
            ...fields,
            ...fields.map(str =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        ]
            .join(' ')
            .toLowerCase();

        return haystack.includes(searchText.toLowerCase());
    });
    // useEffect, rerenderes on likes, as +1 gets updates locally instantly, then sent to backend 
    useEffect(() => {
        const newMap = new Map();
        likes.forEach(({ vendorid }) => {
            newMap.set(vendorid, (newMap.get(vendorid) || 0) + 1);
        });
        setLikeCountsMap(newMap);
    }, [likes]); // Recalculate when `likes` change
    
    const FuncDrillIncrDecrLike = (vendorid: string, change: number): Promise<void> => {
        return new Promise((resolve) => {
            setLikeCountsMap((prevMap) => {
                const newMap = new Map(prevMap);
                const currentCount = newMap.get(vendorid) || 0;
                newMap.set(vendorid, Math.max(0, currentCount + change)); // Apply the change
                return newMap; // React detects state change
            });
            resolve();
        });
    };
    //
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        if(!user) {
            navigate('/login')
        }
        else {
            console.log("logged in")
            handleOpen()
        }
        return Promise.resolve();
    }
    /*const FuncLoadMore = (): Promise<void> => {
        console.log("Load More");
        return Promise.resolve();
    }*/
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // true for xs and sm screens  
    //
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <Container>
                    <div>&nbsp;</div>
                    <Grid container spacing={2}>
                        <HrGreyCustomSeparator marginTop="0px" marginBottom="0px" />
                    <Grid item xs={12} sm={4}>
                        <SearchBarVendors 
                            disabled={false} 
                            searchText={searchText} 
                            onSearch={(value: string) => setSearchText(value)} 
                        />
                    </Grid>
                        <Grid item xs={12} sm={8}
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on mobile, align right on larger screens
                            }}
                        >
                            <ButtonUniversal 
                                icon={IconPlus} 
                                side={ButtonSide.Left}
                                title="Add e-shop" 
                                color={ButtonColor.Pink}
                                //color="#F23CFF"
                                hoverColor={ButtonColor.PinkHover}
                                //hoverColor="#DA16E3"
                                textColor="white" 
                                actionDelegate={FuncAddEshop} 
                                fullWidth={isPhone ? true :  false }
                            />
                        </Grid>
                        <HrGreyCustomSeparator marginTop="16px" marginBottom="16px" />
                    </Grid>
                </Container>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'PixGamer', color: '#6B7280', fontSize:'20px', fontWeight:'400' }}>
                    {filteredEshops?.length ? filteredEshops.length : 'X'} results
                    </p>
                    <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                    {filteredEshops ? (
                        <React.Fragment>
                        {filteredEshops.map((eshop: IEshop, index: number) => (
                            <Grid xs={12} sm={2} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>
                            <TileEshop
                                likes={likeCountsMap.get(eshop.id) || 0}
                                tile={eshop}
                                handleLikeChange={FuncDrillIncrDecrLike}
                            />
                            </Grid>
                        ))}
                        </React.Fragment>
                    ) : (
                        <Grid xs={12} sm={2} key={1} sx={isPhone ? {} : { ...dynamicPadding(1) }}>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <Pwnspinner color="#F23CFF" speed={0.7} thickness={2} />
                        </Grid>
                    )}
                    </Grid>
                    {/* Ready |Load More| btn for partial loding other stuff */}
                    {/*<div>
                        <ButtonUniversal 
                            title="Load more" 
                            color={ButtonColor.Pink}
                            //color="#F23CFF"
                            hoverColor={ButtonColor.PinkHover}
                            //hoverColor="#DA16E3"
                            textColor="white" 
                            actionDelegate={FuncLoadMore} 
                            //fullWidth={isPhone ? true :  false }
                        />
                    </div>*/}
                </div>
            <Footer />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <Box>
                    <FormAddEshop closeModal={handleClose} />
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default Eshops;