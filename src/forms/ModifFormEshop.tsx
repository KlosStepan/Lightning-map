import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonUniversal from "../components/ButtonUniversal";
import IEshop from "../ts/IEeshop";
import {useDropzone} from 'react-dropzone';

type ModifFormEshopProps = {
    edit?: boolean;
    eshop?: IEshop;
    FuncCancel?: () => void; // Optional function to close modal from parent component
};

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({ edit = false, eshop, FuncCancel }) => {
    // Refs for form fields
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const webRef = useRef<HTMLInputElement>(null);
    const logoRef = useRef<HTMLInputElement>(null);

    //Upload imgs
    //AUX stuff
    const onDrop = (acceptedFiles: any) => {
        console.log(acceptedFiles);
    };
    //AUX
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, multiple: false });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    
    // Function to collect data and create an IEshop object for submission
    const createEshopData = (): any => ({ //todo IEshop
        name: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        url: webRef.current?.value || "",
        logo: logoRef.current?.value || "" 
    });

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
            {/*<div>-table of items of datatype IEshop goes here-</div>*/}
            <Typography id="modal-modal-description" style={{ marginTop: "16px" }}>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Title</Typography>
                    <TextField
                        //label=""
                        //variant="outlined"
                        fullWidth
                        inputRef={titleRef}
                        defaultValue={edit ? eshop?.name : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Description</Typography>
                    <TextField
                        //label=""
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
                        //label=""
                        //variant="outlined"
                        fullWidth
                        inputRef={webRef}
                        defaultValue={edit ? eshop?.url : ""}
                    />
                </Box>
                {/*<Box mt={2}>
                    <Typography variant="h2" component="h5">Logo</Typography>
                    <TextField
                        //label=""
                        variant="outlined"
                        fullWidth
                        inputRef={logoRef}
                        defaultValue={edit ? eshop?.logo : ""}
                    />
                </Box>
                <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>
                    Upload Img 
                </Box>*/}
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Logo</Typography>
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})} style={{border: '1px solid #000', margin: '1px 1px !important'}}>
                            <input {...getInputProps()} />
                            <p>&nbsp; Drag 'n' drop logo file here, or click to select file</p>
                        </div>
                        <aside>
                            <h4>Selected file</h4>
                            <ol>{files}</ol>
                        </aside>
                    </section>
                </Box>
                {/* Action Buttons */}
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
            </Typography>
        </React.Fragment>
    );
};

export default ModifFormEshop;
