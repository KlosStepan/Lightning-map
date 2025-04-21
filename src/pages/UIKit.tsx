import React from "react";
import Typography from '@mui/material/Typography';
import TileEshop from "../components/TileEshop";

type UIKitProps = {
    propFromApptsx?: boolean;
    propStuff?: string;    
}

const UIKit: React.FC<UIKitProps> = ({ propFromApptsx = false, propStuff = "propStuffOK" }) => {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                UI Kit {"<UIKit propFromApptsx={true}/>"}
            </Typography>
            <Typography variant="h2" component="h2">
                //{propStuff} //{(propFromApptsx)?"true":"false"}
            </Typography>
            <div>&nbsp;</div>
            <React.Fragment>
                IBaseEntity --&gt; IEshop <br/>
                IBaseEntity --&gt; IMerchant <br/>
                {/* <TileEshop .../> */}
                {/* <TileMerchantBig .../> */}
                {/* <TileMerchant .../> */}
            </React.Fragment>
        </React.Fragment>
    )
};

export default UIKit;