import React, { useRef, useState } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
//Firebase
import { db, storage } from "../components/Firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//Image Compression Library
import imageCompression from 'browser-image-compression';
//MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//Redux+RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//TypeScript
import IEshop from "../ts/IEshop";
//UUID generator
import { v4 as uuidv4 } from 'uuid';

type ModifFormEshopProps = {
    FuncCancel?: () => void; // Optional function to close modal from parent component
} & (
    | { edit: true; eshop: IEshop; documentid: string } // When (edit=true), eshop and documentid are required
    | { edit?: false; eshop?: undefined; documentid?: undefined } // When (edit=false)/undefined, both are optional
);

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({FuncCancel, edit = false, eshop, documentid }) => {
    // DEBUG
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    // debug info
    if (DEBUG) {
        console.log("<DEBUG> ModifFormEshop.tsx");
        console.log("--debugging on--")
        if (edit) console.log("edit: true");
        if (documentid) console.log("Editing document with ID:", documentid);
        console.log("</DEBUG> ModifFormEshop.tsx")
    }

    // Fields - 3x Input
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const webRef = useRef<HTMLInputElement>(null);
    // Upload image - 1 Comp accomodating this
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // CRUD Add/Upd + DummyPopulate/WrapEshop/PrepLogo
    const AddEshop = async () => {
        try {
            // Step 1: Prepare E-shop data without logo
            const newEshop = WrapEshopData({ updStatus: false });
            //console.log("Adding newEshop: ", newEshop);

            // Step 2: Add the E-shop to Firestore Database and retrieve docRef
            const docRef = await addDoc(collection(db, "eshops"), newEshop);
            console.log("E-shop added with docRef: ", docRef.id);
            
            // Step 3: Check for logo, upload logo to Storage
            if (files.length > 0) {
                const file = files[0];
            
                if (file.size === 0) {
                    console.error("Selected file is empty. Please select a valid image.");
                    return;
                }
            
                if (!file.type.startsWith("image/")) {
                    console.error("Selected file is not an image.");
                    return;
                }
            
                console.log("Uploading file:", file.name, "Size:", file.size);
            
                const storageRef = ref(storage, `eshop-logos/${docRef.id}-${file.name}`);
                await uploadBytes(storageRef, file);
                console.log("Image uploaded:", file.name);
            
                const imageUrl = await getDownloadURL(storageRef);
                console.log("Image URL:", imageUrl);
            
                // Stepo 4: Add new logo URL to E-shop record in Firebase Database
                await updateDoc(doc(db, "eshops", docRef.id), { logo: imageUrl });
                console.log("E-shop updated with image URL");
            }            
        } catch (error) {
            console.error("Error adding E-shop: ", error);
        }
    };
    //verify logo changed(/not) vv
    //|- run process prepLogo
    //Promise (data, (/logo) ) -> Firebase (& OK|FAIL)
    const UpdateEshop = async () => {
        if (!documentid) {
            console.error("No document ID provided.");
            return;
        }
    
        try {
            // Prepare updated e-shop data
            const updatedEshop = WrapEshopData({ updStatus: true });
            console.log("Updating e-shop with data:", updatedEshop);
    
            // Ensure it's properly structured for Firestore update
            await updateDoc(doc(db, "eshops", documentid), { ...updatedEshop });
            console.log("E-shop document updated.");
    
            // Step 2: Handle logo update if a new file is uploaded
            if (files.length > 0) {
                const file = files[0];
    
                if (file.size === 0) {
                    console.error("Selected file is empty.");
                    return;
                }
    
                if (!file.type.startsWith("image/")) {
                    console.error("Selected file is not an image.");
                    return;
                }
    
                console.log("Uploading new logo:", file.name, "Size:", file.size);
    
                // Upload new logo to Firebase Storage
                const storageRef = ref(storage, `eshop-logos/${documentid}-${file.name}`);
                await uploadBytes(storageRef, file);
                console.log("New logo uploaded.");
    
                // Get download URL
                const newImageUrl = await getDownloadURL(storageRef);
                console.log("New image URL:", newImageUrl);
    
                // Step 3: Update Firestore with the new logo URL
                await updateDoc(doc(db, "eshops", documentid), { logo: newImageUrl });
                console.log("Firestore updated with new logo.");
            } else {
                console.log("No new logo uploaded, skipping logo update.");
            }
        } catch (error) {
            console.error("Error updating e-shop: ", error);
        }
    };
    
    const WrapEshopData = ({ updStatus }: { updStatus: boolean }): IEshop => ({
        id: updStatus ? eshop?.id || "" : uuidv4(), 
        country: "CZ", //[ ] TODO - implement FE on form (TLD/IP)
        description: descriptionRef.current?.value || "",
        logo: "N/A", //[x] TODO - some ref (?) into Storage/S3
        name: titleRef.current?.value || "",
        owner: user?.uid || "", //[x] TODO fill from Firebase profile
        url: webRef.current?.value || "",
        visible: updStatus, //[x] Add->false, Update->true
    });
    const PrepLogo = async (): Promise<Blob | null> => {
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
    const DebugPopulateDummyEshop = async () => {
        // Random number for unique name to distinguish between Dummy E-shops
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        console.log(`DebugPopulateDummyEshop() called; E-shop: ${randomNumber}`);
        
        // Populate inputs with text
        if (titleRef.current) titleRef.current.value = `Sample E-shop ${randomNumber}`;
        if (descriptionRef.current) descriptionRef.current.value = `This is a dummy description ${randomNumber} for testing.`;
        if (webRef.current) webRef.current.value = `https://www.example${randomNumber}.com`;
        // Populate Upload Comp with dummy logo, image blob - which works correctly for update
        try {
            const response = await fetch("/foto-polis.png"); // Ensure this file exists in `public/`
            const blob = await response.blob();
            const dummyFile = new File([blob], "foto-polis.png", { type: blob.type });
    
            // Generate a proper preview URL
            const fileWithPreview = Object.assign(dummyFile, {
                preview: URL.createObjectURL(dummyFile),
            });
            // Do setFiles like if it was done from UploadComponent
            setFiles([fileWithPreview]);
            console.log("Dummy image (logo) added:", fileWithPreview);
        } catch (error) {
            console.error("Failed to load dummy image(logo):", error);
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
                { DEBUG && (
                    <ButtonUniversal
                        title={"Populate-dummy-eshop ^"}
                        color="#F23CFF"
                        textColor="white"
                        actionDelegate={DebugPopulateDummyEshop}
                    />
                ) }
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
