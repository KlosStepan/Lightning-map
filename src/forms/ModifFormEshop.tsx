import React, { useRef, useState } from "react";
//MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
//Redux+RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//TypeScript
import IEshop from "../ts/IEeshop";

type ModifFormEshopProps = {
    FuncCancel?: () => void; // Optional function to close modal from parent component
} & (
    | { edit: true; eshop: IEshop } // When (edit=true), eshop is required
    | { edit?: false; eshop?: undefined } // When (edit=false)/undefined, eshop is optional
);

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({ edit = false, eshop, FuncCancel }) => {
    //Fields - 3x input
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const webRef = useRef<HTMLInputElement>(null);
    //Upload image - 1x comp
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
    
    // Functions - Add(), Update(), _bundleInput(), //TODO _prepLogo() (/Update - checks for pic update)
    const AddEshop = () => {
        const newEshopWrapped = createEshopData({ updStatus: false });
        console.log("Adding newEshopWrapped: ", newEshopWrapped);
        //Promise(data, logo) -> Firebase (& OK|FAIL transact.)
    };
    const UpdateEshop = () => {
        const updatedEshopWrapped = createEshopData({ updStatus: true });
        console.log("Updating updatedEshopWrapped: ", updatedEshopWrapped);
        //verify logo changed(/not) vv
        //|- run process prepLogo
        //Promise (data, (/logo) ) -> Firebase (& OK|FAIL)
    };
    const createEshopData = ({ updStatus }: { updStatus: boolean }): IEshop => ({
        country: "CZ", //[ ] TODO - implement FE on form (TLD/IP)
        description: descriptionRef.current?.value || "",
        logo: "N/A", //[ ] TODO - some ref (?) into Storage/S3
        name: titleRef.current?.value || "",
        owner: user?.uid || "", //[x] TODO fill from Firebase profile
        url: webRef.current?.value || "",
        visible: updStatus, //[x] Add->false, Update->true
    });
    const prepLogo = (): any => ({
        //take photos[0] -> ModifyPic via the extension
        //https://www.npmjs.com/package/browser-image-compression
    });

    //
    const user = useSelector((state: RootState) => state.misc.user);
    return (
        <React.Fragment>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Title</Typography>
                <TextField
                    fullWidth
                    inputRef={titleRef}
                    defaultValue={edit ? eshop?.name : ""}
                />
            </Box>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Description</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    inputRef={descriptionRef}
                    defaultValue={edit ? eshop?.description : ""}
                    multiline // Enable multiline for the description field
                    minRows={3} // Set the default number of rows to 3
                    maxRows={5} // Optionally, set a maximum number of rows to expand to
                />
            </Box>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Web</Typography>
                <TextField
                    fullWidth
                    inputRef={webRef}
                    defaultValue={edit ? eshop?.url : ""}
                />
            </Box>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Logo</Typography>
                <UploadingImagesSpot files={files} setFiles={setFiles} multipleImages={false} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                {FuncCancel && (
                    <ButtonUniversal 
                        title="Cancel" 
                        color="#8000FF" 
                        textColor="white" 
                        actionDelegate={FuncCancel} 
                    />
                )}
                <ButtonUniversal
                    title={edit ? "Save" : "Add"}
                    color="#F23CFF"
                    textColor="white"
                    actionDelegate={edit ? UpdateEshop : AddEshop}
                />
            </Box>
        </React.Fragment>
    );
};

export default ModifFormEshop;
