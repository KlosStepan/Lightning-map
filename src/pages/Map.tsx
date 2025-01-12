import React from "react";
//MUI
import { Box, Container, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import Modal from "@mui/material/Modal";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import LeafletMapTwo from "../components/LeafletMapTwo";
import SearchFiddle from "../components/SearchFiddle";
import TileMerchant from "../components/TileMerchant";
import TileMerchantBig from "../components/TileMerchantBig";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import Footer from "../components/Footer";
//Router
import {  useNavigate } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setFiltering, setSelected } from "../redux-rtk/mapFilteringSlice";
//TypeScript
import IMerchant from "../ts/IMerchant";
//Forms - our custom
import FormAddSpot from "../forms/FormAddSpot";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';
//Slider
import { Swiper, SwiperSlide } from "swiper/react";
//import "swiper/swiper-bundle.min.css";
import { GlobalStyles } from "@mui/material";
import CardSpot from "../forms/mobilecontentcards/CardSpot";
import { cardStyle } from '../forms/stylesForm';

const filters = ["Food & Drinks", "Shops", "Services"];

type MapProps = {
  //
};

const Map: React.FC<MapProps> = ({ }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const merchants = useSelector((state: RootState) => state.data.merchants)
    const selected = useSelector((state: RootState) => state.mapFiltering.selected)
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
  
    // Function to filter merchants based on active filters
    const filteredMerchants = merchants?.filter((merchant:IMerchant) => {
      const merchantTags = merchant.properties.tags;
  
      // If "All" is active, show all merchants
      if (activeFilters["All"]) return true;
  
      // Otherwise, check if at least one of the merchant's tags matches an active filter
      return merchantTags.some((tag: string) => activeFilters[tag]);
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
                      <LeafletMapTwo data={filteredMerchants} onMerchantSelect={handleMerchantSelect} w={'80vw'} h={'30vh'} />
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
                  <SearchFiddle />
                </Grid>
                
                {/* Filters */}
                <Grid item xs={12} sm={5}>
                <Box sx={{ /*width: "100%",*/ overflow: "hidden" }}>
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
                      color={activeFilters["All"] ? "#8000FF" : "#FFFFFF"}
                      textColor={activeFilters["All"] ? "white" : "black"}
                      actionDelegate={() => FuncFilt("All")}
                    />
                  </SwiperSlide>
                  {filters.map((filter) => (
                    <SwiperSlide key={filter} style={{ width: "auto" }}>
                      <ButtonUniversal
                        title={filter}
                        color={activeFilters[filter] ? "#8000FF" : "#FFFFFF"}
                        textColor={activeFilters[filter] ? "white" : "black"}
                        actionDelegate={() => FuncFilt(filter)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
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
                    side="L"
                    title="Add spot"
                    color="#F23CFF"
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
                    <span style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                      {filteredMerchants?.length ? filteredMerchants?.length : 'X'} results
                    </span>
                  </Grid>
                  <Grid>&nbsp;</Grid>
                  {!isPhone && (
                    selected && (
                      <Grid container spacing={2}>
                        <TileMerchantBig tile={selected.properties} />
                      </Grid>
                    )
                  )}
                  <Grid container spacing={2}>
                    {filteredMerchants?.map((merchant: IMerchant, index: number) => (
                      <Grid xs={12} sm={4} key={index} sx={{ ...dynamicPadding(index) }}>
                        <Box
                          onClick={() => dispatch(setSelected(merchant))}
                          style={{
                            cursor: 'pointer',
                            transition: 'opacity 0.3s ease',
                            opacity: 1,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          <TileMerchant likes={"777"} tile={merchant.properties} index={index} />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {!isPhone && (
                  <Grid item xs={12} sm={5}
                    sx={{
                      display: { xs: 'none', sm: 'block' }, // Hide on mobile, show on larger screens
                    }}
                  >
                    <Box style={{ textAlign: 'center' }}>
                      <LeafletMapTwo data={filteredMerchants} onMerchantSelect={handleMerchantSelect} />
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
                <FormAddSpot closeModal={handleClose}/>
              </Modal>
              <Modal
                open={isPhone && selected != null}
                onClose={() => dispatch(setSelected(null))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={cardStyle} // Use the imported style
              >
                <React.Fragment>
                  {selected && <CardSpot tile={selected.properties} />}
                </React.Fragment>
              </Modal>
          </React.Fragment>
    );
  };
  
  export default Map;