import React from 'react';
//MUI
import { Box } from "@mui/material";
//Redux
//import { useDispatch } from 'react-redux';
//TypeScript
import { IMerchantTile } from '../../ts/IMerchant';
//Icons
import TileMerchantBig from '../../components/TileMerchantBig';

type CardSpotProps=  {
  likes: string;
  tile: IMerchantTile;
}

const CardSpot: React.FC<CardSpotProps> = ({ likes, tile }) => {
  //const dispatch = useDispatch();
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
      <TileMerchantBig likes={likes} tile={tile}/>
      </Box>
    </React.Fragment>
  );
};

export default CardSpot;
