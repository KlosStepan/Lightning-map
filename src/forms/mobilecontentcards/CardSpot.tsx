import React from 'react';
//MUI
import { Box, Container, Grid } from "@mui/material";
//Redux
import { useDispatch, useSelector } from 'react-redux';
//TypeScript
import { IMerchantTile } from '../../ts/IMerchant';
//Icons
import TileMerchantBig from '../../components/TileMerchantBig';

interface CardSpotProps {
  tile: IMerchantTile
}

const CardSpot: React.FC<CardSpotProps> = ({ tile }) => {
  const dispatch = useDispatch();
  return (  
    <React.Fragment>
              {/* Modal Content */}
                <Box
                  onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    borderBottomLeftRadius:0,
                    borderBottomRightRadius:0,
                    //padding: 2,
                    //width: '90%',
                    maxWidth: 600,
                    boxShadow: 24,
                    //marginBottom: 2,
                    outline: 'none', // Remove the default outline that can cause a line
                    border: 'none',  // Ensure no border is applied
                  }}
                >
      <TileMerchantBig tile={tile}/>
      </Box>
    </React.Fragment>
  );
};

export default CardSpot;
