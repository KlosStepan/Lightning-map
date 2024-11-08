import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Input from '@mui/material/Input';

import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import IMerchant from "../ts/IMerchant";

type ModifFormSpotProps = {
    //bool edit //true - loading stuff
    edit: boolean;
    //merchant: IMerchant
    merchant?: IMerchant
    //FuncCancel (vv insert function from parent component to swap modalOpen to false in ^^ component)
}

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false }) => {
    //references
    //states
    //etc.

    //useEffect(() => {
    //  set all stuff from props(?)
    //})
    //FuncCancel (vv insert function from parent component to swap modalOpen to false in ^^ component)

    //function AddSpot()
    const AddSpot = () => {
        console.log("Adding spot")
    }
    //function UpdateSpot()
    const UpdateSpot = () => {
        console.log("Updating spot")
    }
    //NOTE: if(edit)...LOAD
    return(
        <React.Fragment>
                    <div>-table of items of datatype IMerchant goes here-</div>
                  <Box mt={2}>
                  <Typography variant="h2" component="h5">Title</Typography>
                  <Input placeholder="Title" fullWidth />
                </Box>
                <Box mt={2}>
                  <Typography variant="h2" component="h5">Description</Typography>
                  <Input placeholder="Description" fullWidth />
                </Box>
                <Box mt={2}>
                  <Typography variant="h2" component="h5">Address</Typography>
                  <Input placeholder="Address" fullWidth />
                </Box>
                <Box mt={2}>
                  <Typography variant="h2" component="h5">City</Typography>
                  <Input placeholder="City" fullWidth />
                </Box>
                <Box mt={2}>
                  <Typography variant="h2" component="h5">Postal Code</Typography>
                  <Input placeholder="Postal Code" fullWidth />
                </Box>
                <Box mt={2} sx={{ width: '100%', border: '1px solid #000' }}>Map</Box>
                {/* Social Media Links directly in JSX */}
                {/*<Box display="flex" mt={2}>*/}
                <hr/>
                {/*TODO - parametrized setter name->link to Dictionary up^ */}
                <Box mt={2}>
                  <ToggleSocialInput name={"IG"}/>
                  <ToggleSocialInput name={"FB"}/>
                  <ToggleSocialInput name={"X"}/>
                  <ToggleSocialInput name={"Threads"}/>
                </Box>
                <hr/>
                  {/*<Typography style={{ marginLeft: '8px' }}>+IG</Typography>
                  <Typography style={{ marginLeft: '8px' }}>+FB</Typography>
                  <Typography style={{ marginLeft: '8px' }}>+X</Typography>
                  <Typography style={{ marginLeft: '8px' }}>+Threads</Typography>*/}
                {/*</Box>*/}
                <Box mt={2} sx={{ width: '100%', border: '1px solid #000' }}>Upload Img</Box>
                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  {/*<ButtonUniversal title="Cancel changes" color="#8000FF" textColor="white" actionDelegate={FuncCancel} />*/}
                <ButtonUniversal
                    title={edit ? "Save changes" : "Add spot"}
                    color={edit ? "#F23CFF" : "#8000FF"}
                    textColor="white"
                    actionDelegate={edit ? UpdateSpot : AddSpot}
                />
                </Box>
              {/*</Typography>*/}
              </React.Fragment>
    )
}
export default ModifFormSpot;