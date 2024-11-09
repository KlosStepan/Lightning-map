import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

import ButtonUniversal from "../components/ButtonUniversal";
import IEshop from "../ts/IEeshop";


type ModifFormEshopProps = {
    //bool edit //true - loading stuff
    edit: boolean;
    //eshop: IEshop
    eshop?: IEshop
    //FuncCancel (vv insert function from parent component to swap modalOpen to false in ^^ component)
}

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({ edit = false, eshop }) => {
    //references
    //states
    //etc.

    //useEffect(() => {
    //  set all stuff from props(?)
    //})
    //FuncCancel (vv insert function from parent component to swap modalOpen to false in ^^ component)

    //function AddEshop()
    const AddEshop = () => {
        console.log("Adding eshop")
    }
    //function UpdateEshop()
    const UpdateEshop = () => {
        console.log("Updating eshop")
    }
    //NOTE: if(edit)...LOAD
    return(
        <React.Fragment>
        <div>-table of items of datatype IEshop goes here-</div>
        <Typography id="modal-modal-description" style={{ marginTop: '16px' }}>
        <Box mt={2}>
            <Typography variant="h2" component="h5">Title</Typography>
            <Input placeholder="Title" fullWidth />
          </Box>
          <Box mt={2}>
            <Typography variant="h2" component="h5">Description</Typography>
            <Input placeholder="Description" fullWidth />
          </Box>
          <Box mt={2}>
            <Typography variant="h2" component="h5">Web</Typography>
            <Input placeholder="Web" fullWidth />
          </Box>
          <Box mt={2} sx={{ width: '100%', border: '1px solid #000' }}>Upload Img</Box>
          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {/*<ButtonUniversal title="Cancel changes" color="#8000FF" textColor="white" actionDelegate={FuncCancel} />*/}
            <ButtonUniversal
                title={edit ? "Save changes" : "Add Eshop"}
                color={edit ? "#F23CFF" : "#8000FF"}
                textColor="white"
                actionDelegate={edit ? UpdateEshop : AddEshop}
            />
          </Box>
        </Typography>
        </React.Fragment>
    )
}
export default ModifFormEshop;