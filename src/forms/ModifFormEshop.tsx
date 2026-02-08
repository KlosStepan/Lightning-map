import React, { useRef, useState } from "react";
// Components
import ButtonUniversal from "../components/ButtonUniversal";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
// enums
import { ButtonColor } from "../enums";
// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from '@mui/material';
// Redux + RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
// TypeScript
import IEshop from "../ts/IEshop";
// Utils
import { getBackendImageUrl } from "../utils/image";

type ModifFormEshopProps = {
    FuncCancel?: () => void; // Optional function to close modal from parent component
} & (
    | { edit: true; eshop: IEshop; documentid: string } // When (edit=true), eshop and documentid are required
    | { edit?: false; eshop?: undefined; documentid?: undefined } // When (edit=false)/undefined, both are optional
);

const ModifFormEshop: React.FC<ModifFormEshopProps> = ({FuncCancel, edit = false, eshop, documentid }) => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const _user = useSelector((state: RootState) => state.misc.user);
    //
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
    const [keepLogo, setKeepLogo] = useState(true); // True as default, keep logo
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // Redirect logic
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    /**
     * Resolve final logo file name to send to backend.
     *
     * ADD  (updStatus=false):
     *   - file selected: upload -> return new fileName
     *   - no file:       return ""
     *
     * UPDATE (updStatus=true):
     *   - file selected: upload -> return new fileName
     *   - no file, keepLogo=true:  return existing eshop.logo (if any)
     *   - no file, keepLogo=false: return ""
     */
    const ResolveLogoFilename = async (updStatus: boolean): Promise<string> => {
        // 1) If user selected a new file, validate & upload (shared for add/update)
        if (files.length > 0) {
            const file = files[0];
            if (file.size === 0 || !file.type.startsWith("image/")) {
                throw new Error("Please select a valid image file.");
            }
            const uploadResult = await UploadLogo(file);
            return uploadResult.fileName;
        }

        // 2) No new file selected
        if (!updStatus) {
            // ADD, no logo uploaded
            return "";
        }

        // UPDATE
        if (keepLogo) {
            // Keep existing logo if present
            return eshop?.logo || "";
        }

        // Update + !keepLogo + no new file -> clear logo
        return "";
    };   

    const WrapEshopData = ({ updStatus, logoFileName, }: { updStatus: boolean; logoFileName: string; }) => {
        if (updStatus && eshop) {
            // UPDATE: start from existing eshop, override editable fields
            return {
                ...eshop, // keeps id, owner, createdAt, etc.
                name: titleRef.current?.value || eshop.name,
                description: descriptionRef.current?.value || eshop.description,
                url: webRef.current?.value || eshop.url,
                logo: logoFileName,   // backend stores file name in logo
                visible: true,        // your convention: edited => visible
            };
        }

        // ADD: minimal creation payload (no id, no owner; backend fills both)
        return {
            name: titleRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            logoFile: logoFileName,  // backend expects `logoFile` on create
            country: "CZ",
            url: webRef.current?.value || "",
            visible: false,          // new e-shops hidden by default
        };
    };

    type EshopCUDMethod = "POST" | "PUT" | "DELETE";
    const EshopCUD = async ( method: EshopCUDMethod, body: any, opts?: { id?: string } ): Promise<Response> => {
        const idPart = opts?.id ? `?id=${encodeURIComponent(opts.id)}` : "";
        const res = await fetch(`${apiBaseUrl}/eshops/cud${idPart}`, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        return res;
    };  

    const UploadLogo = async (file: File): Promise<{ url: string; fileName: string }> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", "eshop-logos");

        const res = await fetch(`${apiBaseUrl}/upload`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to upload logo");
        return await res.json(); // { url, fileName, size }
    };

    const AddEshop = async () => {
        try {
            setIsAdding(true);

            if (!titleRef.current?.value) {
                alert("Please enter a title/name.");
                setIsAdding(false);
                return;
            }

            // 1) Resolve logo file name (handles upload/validation)
            let logoFileName = "";
            if (files.length > 0) {
                const file = files[0];
                if (file.size === 0 || !file.type.startsWith("image/")) {
                    alert("Please select a valid image file.");
                    setIsAdding(false);
                    return;
                }
                const uploadResult = await UploadLogo(file);
                logoFileName = uploadResult.fileName;
            }

            // 2) Wrap data for ADD (no id, no owner)
            const newEshop = WrapEshopData({
                updStatus: false,
                logoFileName,
            });

            // 3) Send to backend
            const res = await EshopCUD("POST", newEshop);
            if (!res.ok) throw new Error("Failed to create eshop");

            window.location.reload();
        } catch (error) {
            console.error("Error adding E-shop: ", error);
            alert("Error adding E-shop: " + error);
        } finally {
            setIsAdding(false);
        }
    };

    const UpdateEshop = async (): Promise<void> => {
        if (!documentid) {
            console.error("No document ID provided.");
            return;
        }
        try {
            setIsSaving(true);

            // 1) Resolve logo file name (handles upload/keep/clear)
            let logoFileName: string;
            try {
                logoFileName = await ResolveLogoFilename(true); // UPDATE mode
            } catch (err) {
                alert((err as Error).message);
                setIsSaving(false);
                return;
            }

            // 2 Wrap
            const updatedEshop = WrapEshopData({
                updStatus: true,
                logoFileName,
            });
            // 3 Send
            const res = await EshopCUD("PUT", updatedEshop, { id: documentid });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Failed to update eshop: ${res.status} ${text}`);
            }

            if (FuncCancel) FuncCancel();
            else window.location.reload();
        } catch (err) {
            console.error("Error updating E-shop:", err);
            alert("Error updating E-shop: " + (err as Error).message);
        } finally {
            setIsSaving(false);
        }
    };

    // TODO - image: only name, in eshop-logo/{name} AND full/O-{name} (O - original), rewire + rework 2 CUD backend too  
    /*const PrepLogo = async (): Promise<Blob | null> => {
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
    };*/

    const DebugPopulateDummyEshop = async () => {
        // Dummy E-shops #rng-num
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        console.log(`DebugPopulateDummyEshop() called; E-shop: ${randomNumber}`);
        
        // Populate inputs
        if (titleRef.current) titleRef.current.value = `Sample E-shop ${randomNumber}`;
        if (descriptionRef.current) descriptionRef.current.value = `This is a dummy description ${randomNumber} for testing.`;
        if (webRef.current) webRef.current.value = `https://www.example${randomNumber}.com`;
        // Populate Upload Comp with dummy logo, image blob - which works correctly for update
        try {
            const response = await fetch("/dummy-eshop.png"); // Ensure this file exists in `public/`
            const blob = await response.blob();
            const dummyFile = new File([blob], "dummy-eshop.png", { type: blob.type });
    
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
                    multiline
                    minRows={3}
                    maxRows={5}
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
                {edit && (
                    <React.Fragment>
                        <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={keepLogo}
                                        onChange={(e) => setKeepLogo(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Keep logo"
                                sx={{ mr: 2 }}
                            />
                            {eshop?.logo && (
                                <span style={{ display: 'inline-block', width: 40, height: 40, border: '1px solid black', borderRadius: 4, marginRight: 4, overflow: 'hidden' }}>
                                    <img 
                                        src={getBackendImageUrl(eshop.logo, apiBaseUrl || "")} 
                                        alt="logo-thumb" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: keepLogo ? 'none' : 'grayscale(100%)' }} 
                                    />
                                </span>
                            )}
                        </Box>
                        <HrGreyCustomSeparator marginTop={5} marginBottom={5} />
                    </React.Fragment>
                )}
                <UploadingImagesSpot 
                    files={files} 
                    setFiles={setFiles} 
                    disabled={(edit) ? keepLogo : false} 
                    multipleImages={false} 
                />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                { DEBUG && (
                    <ButtonUniversal
                        title={"Populate-dummy-eshop ^"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={DebugPopulateDummyEshop}
                    />
                )}
                {FuncCancel && (
                    <ButtonUniversal 
                        title="Cancel" 
                        color={ButtonColor.Purple}
                        hoverColor={ButtonColor.PurpleHover}
                        textColor="white" 
                        actionDelegate={FuncCancel} 
                    />
                )}
                {edit ? (
                    <ButtonUniversal
                        title={isSaving ? "Saving ..." : "Save"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={UpdateEshop}
                        disabled={isSaving}
                    />
                ) : (
                    <ButtonUniversal
                        title={isAdding ? "Adding ..." : "Add"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={AddEshop}
                        disabled={isAdding}
                    />
                )}
            </Box>
        </React.Fragment>
    );
};

export default ModifFormEshop;
