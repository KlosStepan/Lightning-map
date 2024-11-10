import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import ButtonUniversal from "../components/ButtonUniversal";
import IEshop from "../ts/IEeshop";

type ModifFormEshopProps = {
    edit?: boolean;
    eshop?: IEshop;
    // FuncCancel (optional function to close modal from parent component)
    FuncCancel?: () => void;
};

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({ edit = false, eshop, FuncCancel }) => {
    // Refs for form fields
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const webRef = useRef<HTMLInputElement>(null);
    const logoRef = useRef<HTMLInputElement>(null); // Example for a file input or URL

    // Function to collect data and create an IEshop object for submission
    const createEshopData = (): any => { //any - IEshop sliced
        return {
            name: titleRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            url: webRef.current?.value || "",
            logo: logoRef.current?.value || "" // Assuming logo is a URL or base64 string
        };
    };

    // Add Eshop
    const AddEshop = () => {
        const newEshopData = createEshopData();
        console.log("Adding eshop:", newEshopData);
        // Insert logic to add the e-shop here
    };

    // Update Eshop
    const UpdateEshop = () => {
        const updatedEshopData = createEshopData();
        console.log("Updating eshop:", updatedEshopData);
        // Insert logic to update the e-shop here
    };

    return (
        <React.Fragment>
            <div>-table of items of datatype IEshop goes here-</div>
            <Typography id="modal-modal-description" style={{ marginTop: "16px" }}>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Title</Typography>
                    <Input 
                        placeholder="Title"
                        fullWidth
                        inputRef={titleRef}
                        defaultValue={edit ? eshop?.name : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Description</Typography>
                    <Input 
                        placeholder="Description"
                        fullWidth
                        inputRef={descriptionRef}
                        defaultValue={edit ? eshop?.description : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Web</Typography>
                    <Input 
                        placeholder="Web"
                        fullWidth
                        inputRef={webRef}
                        defaultValue={edit ? eshop?.url : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Logo</Typography>
                    <Input 
                        placeholder="Logo URL" 
                        fullWidth 
                        inputRef={logoRef}
                        defaultValue={edit ? eshop?.logo : ""}
                    />
                </Box>
                <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>
                    Upload Img {/* Placeholder for image upload */}
                </Box>
                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    {FuncCancel && (
                        <ButtonUniversal 
                            title="Cancel changes" 
                            color="#8000FF" 
                            textColor="white" 
                            actionDelegate={FuncCancel} 
                        />
                    )}
                    <ButtonUniversal
                        title={edit ? "Save changes" : "Add Eshop"}
                        color={edit ? "#F23CFF" : "#8000FF"}
                        textColor="white"
                        actionDelegate={edit ? UpdateEshop : AddEshop}
                    />
                </Box>
            </Typography>
        </React.Fragment>
    );
};

export default ModifFormEshop;
