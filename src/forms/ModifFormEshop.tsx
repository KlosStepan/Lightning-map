import React, { useRef, useState } from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
//TypeScript
import IEshop from "../ts/IEeshop";

//ModifFormEshop <- props
type ModifFormEshopProps = {
    edit?: boolean;
    eshop?: IEshop;
    FuncCancel?: () => void; // Optional function to close modal from parent component
};

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({ edit = false, eshop, FuncCancel }) => {
    //Fields
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const webRef = useRef<HTMLInputElement>(null);
    //const logoRef = useRef<HTMLInputElement>(null);
    //Upload image
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
    
    // Add and Update functions
    const AddEshop = () => {
        const newEshopData = createEshopData();
        console.log("Adding eshop:", newEshopData);
        // Insert logic to add the e-shop here
    };
    const UpdateEshop = () => {
        const updatedEshopData = createEshopData();
        console.log("Updating eshop:", updatedEshopData);
        // Insert logic to update the e-shop here
    };
    // Function to collect data and create an IEshop object for submission
    const createEshopData = (): any => ({ //todo IEshop
        name: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        url: webRef.current?.value || "",
        //logo: logoRef.current?.value || ""
        logo: files,
    });

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
