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
import imageCompression from 'browser-image-compression';

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
    const AddEshop = async () => {
        const newEshopWrapped = createEshopData({ updStatus: false });
        console.log("Adding newEshopWrapped: ", newEshopWrapped);
        //prepped logos here <- in some list (?) or single file
        const logo = await prepLogo();
        console.log("Compressed logo: ", logo);
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
    const prepLogo = async (): Promise<Blob | null> => {
        console.log("prepLogo() called");
    
        if (!files.length) {
            console.error("No file selected.");
            return null;
        }
    
        const imageFile = files[0];
        console.log("Original File:", imageFile);
        console.log("originalFile instanceof Blob:", imageFile instanceof Blob);
        console.log(`originalFile size: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`);
    
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 100,
            useWebWorker: true,
        };
    
        try {
            const compressedFile: Blob = await imageCompression(imageFile, options);
            console.log("Compressed File:", compressedFile);
            console.log("compressedFile instanceof Blob:", compressedFile instanceof Blob);
            console.log(`compressedFile size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    
            return compressedFile; // ✅ Return the compressed Blob
        } catch (error) {
            console.error("Error during image compression:", error);
            return null; // ✅ Return null if compression fails
        }
    };
    
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
