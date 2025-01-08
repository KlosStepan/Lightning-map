import React from "react";
//MUI
import { Box, Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import LeafletMapTwo from "../components/LeafletMapTwo";
import SearchFiddle from "../components/SearchFiddle";
import TileMerchant from "../components/TileMerchant";
import TileMerchantBig from "../components/TileMerchantBig";
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
    
    return (
          <React.Fragment>
              <Container>
                  <div>&nbsp;</div>
                  <Grid container spacing={2}>
                      <Grid item xs={4}>
                          <SearchFiddle />
                      </Grid>
                      <Grid item xs={5}>
                          <ButtonUniversal
                              title="All"
                              color={activeFilters["All"] ? "#8000FF" : "#FFFFFF"}  // Purple if All is active
                              textColor={activeFilters["All"] ? "white" : "black"}
                              actionDelegate={() => FuncFilt("All")}
                          />
                          {filters.map((filter) => (
                              <ButtonUniversal
                                  key={filter}
                                  title={filter}
                                  color={activeFilters[filter] ? "#8000FF" : "#FFFFFF"}  // Purple if filter is active
                                  textColor={activeFilters[filter] ? "white" : "black"}
                                  actionDelegate={() => FuncFilt(filter)}
                              />
                          ))}
                      </Grid>
                      <Grid item xs={3}>
                        <ButtonUniversal
                            icon={IconPlus}
                            side="L"
                            title="Add spot"
                            color="#F23CFF"
                            textColor="white"
                            actionDelegate={FuncAddSpot}
                        />
                      </Grid>
                  </Grid>
              </Container>
              <Grid container spacing={3}>
                  <Grid item xs={7}>
                  <Grid>&nbsp;</Grid>
                    <Grid container spacing={2}>
                      <span style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>{filteredMerchants?.length ? filteredMerchants?.length : 'X'} results</span>
                    </Grid>
                    <Grid>&nbsp;</Grid>
                      {selected && ( // If selected & not null or not undefined
                        <Grid container spacing={2}>
                          <TileMerchantBig tile={selected.properties} />
                        </Grid>
                      )}
                      <Grid container spacing={2}>
                        {filteredMerchants?.map((merchant: IMerchant, index: number) => (
                          <Grid xs={12} sm={4} key={index} sx={{ ...dynamicPadding(index) }} >
                            <Box
                              onClick={() => dispatch(setSelected(merchant))}
                              style={{
                                cursor: 'pointer',    // Shows pointer cursor on hover
                                transition: 'opacity 0.3s ease', // Smooth transition effect for hover
                                opacity: 1,
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')} // Hover effect
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}  // Reset on mouse leave
                            >
                              <TileMerchant likes={"777"} tile={merchant.properties} index={index} />
                            </Box>
                        </Grid>
                          ))}
                      </Grid>
                  </Grid>
                  <Grid item xs={5}>
                      <Box style={{ textAlign: 'center' }}>
                          <LeafletMapTwo data={filteredMerchants} onMerchantSelect={handleMerchantSelect} />
                      </Box>
                  </Grid>
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
          </React.Fragment>
    );
  };
  
  export default Map;