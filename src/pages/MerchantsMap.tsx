import React, {useState, useMemo, useEffect} from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import LeafletMapTwo from "../components/LeafletMapTwo";
import SearchBarVendors from "../components/SearchBarVendors";
import TileMerchant from "../components/TileMerchant";
import TileMerchantBig from "../components/TileMerchantBig";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import Footer from "../components/Footer";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Forms
import FormAddSpot from "../forms/FormAddSpot";
import CardSpot from "../forms/mobilecontentcards/CardSpot";
import { cardStyle } from '../forms/stylesForm';
//MUI
import { Box, Container, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import Modal from "@mui/material/Modal";
import { GlobalStyles } from "@mui/material";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setFiltering, setSelected } from "../redux-rtk/mapFilteringSlice";
//Router
import {  useNavigate } from "react-router-dom";
//Slider
import { Swiper, SwiperSlide } from "swiper/react";
//TypeScript
import IMerchant from "../ts/IMerchant";

//Pwnspinner
import { Pwnspinner } from "pwnspinner";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';

const filters = ["Food & Drinks", "Shops", "Services"];

type MerchantsMapProps = {
  //
};

const MerchantsMap: React.FC<MerchantsMapProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const user = useSelector((state: RootState) => state.misc.user);
    //
    const merchants = useSelector((state: RootState) => state.data.merchants);
    //const likes = useSelector((state: RootState) => state.data.likes) ?? [];
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());
    // useEffect, rerenderes on likes, as +1 gets updates locally instantly, then sent to backend 
    useEffect(() => {
        const newMap = new Map();
        likes.forEach(({ entityId }) => {
            newMap.set(entityId, (newMap.get(entityId) || 0) + 1);
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
    const selected = useSelector((state: RootState) => state.mapFiltering.selected);
    const activeFilters = useSelector((state: RootState) => state.mapFiltering?.filters || {});
    //
    const FuncFilt = (filter: string): Promise<void> => {
        dispatch(setFiltering(filter));
        return Promise.resolve();
    };
    //
    const FuncAddSpot = (): Promise<void> => {
      console.log("AddSpot");
      if(!user) {
        navigate('/login')
      }
      else {
        console.log("logged in")
        handleOpen()
      }
      return Promise.resolve();
    };
  
    // Function to filter merchants based on active filters + search text
    const [searchText, setSearchText] = useState('');
    const filteredMerchants = merchants?.filter((merchant: IMerchant) => {
      const { name, description, owner, tags, socials, address } = merchant.properties;

      const fields = [
        name,
        description,
        owner || '',
        ...tags,
        ...(socials?.map(s => `${s.label} ${s.link}`) || []),
        address.address,
        address.city,
        address.postalCode,
      ];

      const haystack = [
        ...fields,
        ...fields.map(str =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove diacritics
        ),
      ]
        .join(" ")
        .toLowerCase();

      const search = searchText.toLowerCase();

      // Include only if it matches the search AND matches tags filter
      const tagsMatch = activeFilters["All"]
        ? true
        : tags.some((tag: string) => activeFilters[tag]);

      return tagsMatch && haystack.includes(search);
    });

    //Callback from child component LeafletMap.js
    const handleMerchantSelect = (merchant:any) => {
      dispatch(setSelected(merchant))
    };

    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //

    const dynamicPadding = (index: number) => {
      const paddingValue = 24; // between tiles space
      switch (index % 3) {
        case 0:
          return { padding: `${paddingValue}px 8px ${paddingValue}px 0px !important` }; // Left tile
        case 1:
          return { padding: `${paddingValue}px 4px ${paddingValue}px 4px !important` }; // Middle tile
        case 2:
          return { padding: `${paddingValue}px 0px ${paddingValue}px 8px !important` }; // Right tile
        default:
          return {};
      }
    };
    //
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // true for xs and sm screens  
    //
    return (
          <React.Fragment>
            <GlobalStyles
              styles={`@import "https://unpkg.com/swiper/swiper-bundle.min.css";`}
            />
              <>
                {isPhone && (
                  <Grid item xs={12} sm={0} // Hide on larger screens
                    sx={{
                      display: { xs: 'block', sm: 'none' }, // Show only on mobile, hide on larger screens
                    }}
                  >
                    <Box style={{ textAlign: 'center' }}>
                      <LeafletMapTwo data={filteredMerchants ?? []} onMerchantSelect={handleMerchantSelect} w={'80vw'} h={'30vh'} />
                    </Box>
                  </Grid>
                )}
              </>
              <Container>
                  <div>&nbsp;</div>
                  <Grid container spacing={2}>
                {!isPhone&&<HrGreyCustomSeparator marginTop="0px" marginBottom="0px" />}
                
                {/* Search Bar */}
                <Grid item xs={12} sm={4}>
                  <SearchBarVendors
                    searchText={searchText}
                    onSearch={(value: string) => setSearchText(value)}
                  />
                </Grid>
                
                {/* Filters */}
                <Grid item xs={12} sm={5}>
                <Box sx={{ /*width: "100%",*/ overflow: "hidden" }}>
                {/* TODO FIX - hotfix of blicking buttons in slider */}
                <div style={{height:'40px'}}>
                <Swiper
                  modules={[]} // Exclude Scrollbar module
                  spaceBetween={8} // Space between slides
                  slidesPerView="auto" // Dynamically calculate based on content width
                  freeMode={true} // Enable free scrolling without snapping
                  //scrollbar={{ draggable: true }} // Explicitly disable it if included
                >
                  <SwiperSlide style={{ width: "auto" }}>
                    <ButtonUniversal
                      title="All"
                      color={activeFilters["All"] ? ButtonColor.Purple : ButtonColor.White}
                      hoverColor={activeFilters["All"] ? ButtonColor.PurpleHover : ButtonColor.Grey}
                      //hoverColor="green"
                      textColor={activeFilters["All"] ? "white" : "black"}
                      actionDelegate={() => FuncFilt("All")}
                    />
                  </SwiperSlide>

                  {filters.map((filter) => (
                    <SwiperSlide key={filter} style={{ width: "auto" }}>
                      <ButtonUniversal
                        title={filter}
                        color={activeFilters[filter] ? ButtonColor.Purple : ButtonColor.White}
                        hoverColor={activeFilters[filter] ? ButtonColor.PurpleHover : ButtonColor.Grey}
                        //hoverColor="green"
                        textColor={activeFilters[filter] ? "white" : "black"}
                        actionDelegate={() => FuncFilt(filter)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
              </Box>
              </Grid>
                
                {/* Add Spot Button */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on mobile, align right on larger screens
                  }}
                >
                  <ButtonUniversal
                    icon={IconPlus}
                    side={ButtonSide.Left}
                    title="Add spot"
                    color={ButtonColor.Pink}
                    //color="#F23CFF"
                    hoverColor={ButtonColor.PinkHover}
                    //hoverColor="#DA16E3"
                    textColor="white"
                    actionDelegate={FuncAddSpot}
                    fullWidth={isPhone ? true :  false }
                  />
                </Grid>
                
                <HrGreyCustomSeparator marginTop="16px" marginBottom="16px" />
              </Grid>
              </Container>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Grid>&nbsp;</Grid>
                  <Grid container spacing={2}>
                    <span style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'PixGamer', color: '#6B7280', fontSize:'20px', fontWeight:'400' }}>
                      {filteredMerchants?.length ? filteredMerchants?.length : 'X'} results
                    </span>
                  </Grid>
                  <Grid>&nbsp;</Grid>
                  {!isPhone && (
                    selected && (
                      <Grid container spacing={2}>
                        <TileMerchantBig
                          likes={likeCountsMap.get(selected.properties.id) || 0}
                          tile={selected.properties}
                          handleLikeChange={FuncDrillIncrDecrLike}
                        />
                      </Grid>
                    )
                  )}
                  <Grid container spacing={2}>
                    {filteredMerchants ? (
                      <React.Fragment>
                        {filteredMerchants.map((merchant: IMerchant, index: number) => (
                          <Grid xs={12} sm={4} key={index} sx={{ ...dynamicPadding(index) }}>
                            <Box
                              onClick={() => dispatch(setSelected(merchant))}
                              style={{
                                cursor: 'pointer',
                                //transition: 'opacity 0.3s ease',
                                opacity: 1,
                              }}
                              //onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                              //onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                              <TileMerchant likes={likeCountsMap.get(merchant.properties.id) || 0} tile={merchant.properties} index={index} />
                            </Box>
                          </Grid>
                        ))}
                      </React.Fragment>
                    ) : (
                      <Grid xs={12} sm={4} key={1} sx={{ ...dynamicPadding(1) }}>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <Pwnspinner color="#8000FF" speed={0.7} thickness={2} />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {!isPhone && (
                  <Grid item xs={12} sm={5}
                    sx={{
                      display: { xs: 'none', sm: 'block' }, // Hide on mobile, show on larger screens
                    }}
                  >
                    <Box style={{ textAlign: 'center' }}>
                      <LeafletMapTwo data={filteredMerchants ?? []} onMerchantSelect={handleMerchantSelect} />
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Footer />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                  <FormAddSpot closeModal={handleClose}/>
                </Box>
              </Modal>
              <Modal
                open={isPhone && selected != null}
                onClose={() => dispatch(setSelected(null))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={cardStyle} // Use the imported style
              >
                <React.Fragment>
                  {selected && <CardSpot likes={likeCountsMap.get(selected.properties.id) || 0} tile={selected.properties} />}
                </React.Fragment>
              </Modal>
          </React.Fragment>
    );
  };
  
  export default MerchantsMap;