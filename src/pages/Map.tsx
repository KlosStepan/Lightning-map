import React from "react";
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import ButtonUniversal from "../components/ButtonUniversal";
import SearchFiddle from "../components/SearchFiddle";
import Footer from "../components/Footer";
import TileMerchantBig from "../components/TileMerchantBig";
import TileMerchant from "../components/TileMerchant";
import IconPlus from '../icons/ico-btn-plus.png';
import GMap from "../components/GMap";
import { Link, useNavigate } from "react-router-dom";
//import LeafletMap from "../components/LeafletMapOne";
import LeafletMapTwo from "../components/LeafletMapTwo";

//Redux
import { RootState } from "../redux-rtk/store";
import { useDispatch, useSelector } from 'react-redux';
//
import { setFiltering, setSelected } from "../redux-rtk/mapFilteringSlice";
import IMerchant from "../ts/IMerchant";
//MUI stuff
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from '@mui/material/Input';
//
import closeIcon from '../icons/close.png';
import ToggleSocialInput from "../components/ToggleSocialInput";
//ADD SPOT 
import FormAddSpot from "../forms/FormAddSpot";
import ModifFormMerchant from "../components/ModifFormMerchant";

const iconStyle = {
  width: 18, // Adjust icon size as needed
  height: 18,
};

const filters = ["Food & Drinks", "Shops", "Services"];

const merchants2: IMerchant[] = [
    {
      "geometry": {
        "coordinates": [14.4483471, 50.1033561],
        "type": "Point"
      },
      "properties": {
        "owner": "OxMuB2PyqsM3pUtwTEmB86EzM9p1",
        "visible": true,
        "image": "dummyImgTile1",
        "title": "Paralelní Polis",
        "description": "lorem ipsum2",
        address: {
          address: "Dělnická 43",
          city: "Praha 7",
          postalCode: "170 00",
        },
        "tags": ["Shops", "Services"],
        "socials": [
          {
            "network": "web",
            "label": "Web",
            "link": "https://www.paralelnipolis.com"
          },
          {
            "network": "facebook",
            "label": "FB",
            "link": "https://www.facebook.com/paralelnipolis"
          },
          {
            "network": "instagram",
            "label": "IG",
            "link": "https://www.instagram.com/paralelnipolis"
          },
          {
            "network": "twitter",
            "label": "X",
            "link": "https://www.twitter.com/paralelnipolis"
          }
        ]
      },
      "type": "Feature"
    },
    {
      "geometry": {
        "coordinates": [14.4440644, 50.0719584],
        "type": "Point"
      },
      "properties": {
        "owner": "7G9IT4IfBBV2JV8UJDhiMPzYWOq2",
        "visible": true,
        "image": "dummyImgTile2",
        "title": "Blue Vegan Pig Shop",
        "description": "lorem ipsum",
        address: {
          address: "Štefánikova 6",
          city: "Praha 5",
          postalCode: "150 00",
        },
        "tags": ["Food & Drinks", "Shops"],
        "socials": [
          {
            "network": "web",
            "label": "Web",
            "link": "https://www.blueveganpigshop.com"
          },
          {
            "network": "facebook",
            "label": "FB",
            "link": "https://www.facebook.com/blueveganpigshop"
          },
          {
            "network": "instagram",
            "label": "IG",
            "link": "https://www.instagram.com/blueveganpigshop"
          },
          {
            "network": "twitter",
            "label": "X",
            "link": "https://www.twitter.com/blueveganpigshop"
          }
        ]
      },
      "type": "Feature"
    }
  ];

const Map: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const merchants = useSelector((state: RootState) => state.data.merchants)
    const selected = useSelector((state: RootState) => state.mapFiltering.selected)
    ////console.log("merchants")
    ////console.log(merchants)
    const activeFilters = useSelector((state: RootState) => state.mapFiltering?.filters || {});
    //
    const FuncFilt = (filter: string): Promise<void> => {
        dispatch(setFiltering(filter));
        return Promise.resolve();
    };
  
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
    const FuncCancel = (): Promise<void> => {
      handleClose()
      return Promise.resolve();
    };
    const FuncSave = (): Promise<void> => {
      console.log("Saving")
      return Promise.resolve();
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
                      <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>{filteredMerchants?.length} results</p>
                      {selected && ( // If selected & not null or undefined
                        <Grid container spacing={2}>
                          <TileMerchantBig tile={selected.properties} />
                        </Grid>
                      )}
                      <Grid container spacing={2}>
                        {filteredMerchants?.map((merchant: IMerchant) => (
                          <Grid item xs={4} key={merchant.properties.owner}>
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
                              <TileMerchant likes={"777"} tile={merchant.properties} />
                            </Box>
                            </Grid>
                          ))}
                      </Grid>
                  </Grid>
                  <Grid item xs={5}>
                      <Box style={{ /*height: 100,*/ textAlign: 'center' }}>
                          <LeafletMapTwo data={filteredMerchants} onMerchantSelect={handleMerchantSelect} />
                      </Box>
                  </Grid>
              </Grid>
              <Footer />
              {/*MODAL*/}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <FormAddSpot closeModal={handleClose}/>
              </Modal>
          </React.Fragment>
    );
  };
  
  export default Map;