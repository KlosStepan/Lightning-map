import React, { useEffect, useRef, useState } from "react";
// Components
import ButtonUniversal from "../components/ButtonUniversal";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import TagMerchant from "../components/TagMerchant";
import ToggleSocialInput from "../components/ToggleSocialInput";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
// enums
import { ButtonColor } from "../enums";
// Map stuff
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import group13 from '../icons/group13.png';
// MUI
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
// Utils
import { getBackendImageUrl } from "../utils/image";

const tagsAll = ["Food & Drinks", "Shops", "Services"];

type ModifFormSpotProps = {
    FuncCancel: () => void;
} & (
    | { edit: true; merchant: IMerchantTile; documentid: string } // When editing, require documentid
    | { edit?: false; merchant?: undefined; documentid?: undefined } // When adding, nothing mandated
);

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({FuncCancel, edit = false, merchant, documentid }) => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const _user = useSelector((state: RootState) => state.misc.user);
    //
    if (DEBUG) {
        console.log("<DEBUG> ModifFormSpot.tsx")
        console.log("--debugging on--")
        if (documentid) console.log("Editing document with ID, documentid:", documentid)
        if (edit) console.log("edit: true")
        if (merchant) console.log("merchant: true")
        console.log("</DEBUG> ModifFormSpot.tsx")
    }
    // Fields - 5x Input
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    // Map - 1x <MapContainer ... with map stuff & Picker pin
    const mapRef2 = useRef(null);
    const latitude = 50.0755; //<- TODO dynamically in the city (?)
    const longitude = 14.4378; //<- TODO dynamically in the city (?)
    // |- Picker pin 🗲 stuff 
    const [position, setPosition] = useState<[number, number]>([50.0755, 14.4378]); // Default position
    const handleDragEnd = (event: L.DragEndEvent) => {
        const marker: L.Marker<any> = event.target as L.Marker;
        const newPosition: L.LatLng = marker.getLatLng();
        if(DEBUG){
            console.log("<DEBUG> handleDragEnd")
            console.log(newPosition)
            console.log("</DEBUG> handleDragEnd")
        }
        setPosition([newPosition.lat, newPosition.lng]);
    };
    // Socials - 5 Socials Inputs, socials.map((social) => (
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: null },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: null },
        { network: "twitter", label: "X", link: null },
        { network: "threads", label: "@", link: null },
    ]);
    // |- Add / Delete Social Network, from <ToggleSocialInput .../>
    const handleLinkOpened = (network: string, newLink: string | null) => {
        setSocials((prevSocials) =>
            prevSocials.map((social) =>
                social.network === network ? { ...social, link: newLink } : social
            )
        );
    };
    // Tags - What stuff does this merchant sell?
    const [tags, setTags] = useState<string[]>([]);
    // |- Add / Delete Tag, from <TagMerchant .../>
    const handleTagPressed = (adding: boolean, tag: string) => {
        let _tags: string[] = tags.slice();
        if (adding) {
            _tags.push(tag);
        } else {
            _tags = _tags.filter(t => t !== tag);
        }
        setTags(_tags);
    };
    // Upload images - 1x <UploadingImagesSpot ... drilled down setFiles
    const [keepPhotos, setKeepPhotos] = useState(true);  // True as default, keep photos
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // Redirect logic
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    useEffect(() => {
        if (!merchant) return; // Ensure we have merchant from props
        //
        setTags(merchant.tags);
        setSocials(merchant.socials);
    }, [merchant]);

    /**
     * Resolve final imageFileNames for merchant.
     *
     * ADD  (updStatus=false):
     *   - files selected: upload all -> return new fileNames
     *   - no files:       return []
     *
     * UPDATE (updStatus=true):
     *   - files selected: upload all -> return new fileNames
     *   - no files, keepPhotos=true:  return existing merchant.images (if any)
     *   - no files, keepPhotos=false: return []
     */
    const ResolveImageFileNames = async (updStatus: boolean): Promise<string[]> => {
        // 1) If user selected new files, validate & upload (shared for add/update)
        if (files.length > 0) {
            for (const file of files) {
                if (file.size === 0 || !file.type.startsWith("image/")) {
                    throw new Error("Please select valid image file(s).");
                }
            }

            const uploaded = await Promise.all(
                files.map((file) =>
                    uploadImage(file, "merchants-photos")
                )
            );

            return uploaded.map((u) => u.fileName);
        }

        // 2) No new files selected
        if (!updStatus) {
            // ADD, no images uploaded
            return [];
        }

        // UPDATE
        if (keepPhotos) {
            // Keep existing images if present
            return merchant?.images || [];
        }

        // Update + !keepPhotos + no new files -> clear images
        return [];
    };
    const WrapSpotData = ({ updStatus, imageFileNames, coordinates }: { updStatus: boolean, imageFileNames: string[], coordinates: [number, number]}) => {
        if (updStatus && merchant) {
            // UPDATE: start from existing merchant, override editable fields
            return {
                ...merchant, // keep id, owner, createdAt, etc.
                name: nameRef.current?.value || merchant.name || "",
                description: descriptionRef.current?.value || merchant.description || "",
                address: {
                    address: addressRef.current?.value || merchant.address.address || "",
                    city: cityRef.current?.value || merchant.address.city || "",
                    postalCode: postalCodeRef.current?.value || merchant.address.postalCode || "",
                },
                images: imageFileNames,
                tags: tags || merchant.tags || [],
                socials: socials || merchant.socials || [],
                visible: true,              // your convention: edited => visible
                coordinates,                // [lon, lat]
            };
        }

        // ADD: MerchantInput (no id, no owner)
        return {
            name: nameRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            address: {
                address: addressRef.current?.value || "",
                city: cityRef.current?.value || "",
                postalCode: postalCodeRef.current?.value || "",
            },
            coordinates,                   // [lon, lat]
            tags: tags || [],
            socials: socials || [],
            imageFiles: imageFileNames,    // backend takes file names from /upload
            visible: false,                // new spots default hidden
        };
    };

    type MerchantCUDMethod = "POST" | "PUT" | "DELETE";  
    const MerchantCUD = async ( method: MerchantCUDMethod, body: any, opts?: { id?: string }): Promise<Response> => {
        const idPart = opts?.id ? `?id=${encodeURIComponent(opts.id)}` : "";
        const res = await fetch(`${apiBaseUrl}/merchants/cud${idPart}`, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        return res;
    };

    const uploadImage = async (file: File, category = "merchants-photos"): Promise<{ url: string; fileName: string }> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        const res = await fetch(`${apiBaseUrl}/upload`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`Upload failed: ${res.status} ${txt}`);
        }
        return await res.json(); // { url, fileName, size }
    };

    const AddSpot = async (): Promise<void> => {
        try {
            setIsAdding(true);

            // Basic validation
            if (!nameRef.current?.value) {
                alert("Please enter a title/name.");
                setIsAdding(false);
                return;
            }

            // 1) Resolve image file names (handles validation/upload)
            let imageFileNames: string[];
            try {
                imageFileNames = await ResolveImageFileNames(false); // ADD mode
            } catch (err) {
                alert((err as Error).message);
                setIsAdding(false);
                return;
            }

            // Convert position [lat, lng] -> [lon, lat] expected by backend
            const [lat, lon] = position;
            const coordinates: [number, number] = [lon, lat];

            // 2) Wrap input for ADD
            const merchantInput = WrapSpotData({
                updStatus: false,
                imageFileNames,
                coordinates,
            });

            // 3) Send to backend via MerchantCUD
            const res = await MerchantCUD("POST", merchantInput);
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Failed to create merchant: ${res.status} ${txt}`);
            }

            if (FuncCancel) FuncCancel();
            else window.location.reload();
        } catch (err) {
            console.error("AddSpot error:", err);
            alert("Error adding spot: " + ((err as Error).message || err));
        } finally {
            setIsAdding(false);
        }
    };

    const UpdateSpot = async (): Promise<void> => {
        if (!documentid) {
            console.error("No document ID provided.");
            return;
        }

        try {
            setIsSaving(true);

            // 1) Resolve image file names (handles upload/keep/clear)
            let imageFileNames: string[];
            try {
                imageFileNames = await ResolveImageFileNames(true); // UPDATE mode
            } catch (err) {
                alert((err as Error).message);
                setIsSaving(false);
                return;
            }

            // 2) Build updated merchant payload via wrapper
            const [lat, lon] = position;
            const coordinates: [number, number] = [lon, lat];

            const updatedMerchant = WrapSpotData({
                updStatus: true,
                imageFileNames,
                coordinates,
            });

            // 3) Send PUT to backend via MerchantCUD
            const res = await MerchantCUD("PUT", updatedMerchant, { id: documentid });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Failed to update merchant: ${res.status} ${txt}`);
            }

            // 4) Close modal or reload
            if (FuncCancel) FuncCancel();
            else window.location.reload();
        } catch (err) {
            console.error("Error updating spot:", err);
            alert("Error updating spot: " + ((err as Error).message || err));
        } finally {
            setIsSaving(false);
        }
    };


    /*const PrepPics = (): any => ({
        //dadada, do after Spot is prototyped for all (in loop 3x) via the ext.
        //https://www.npmjs.com/package/browser-image-compression
    });*/

    const DebugPopulateDummySpot = async () => {
        // Dummy Merchant #rng-num
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        console.log(`DebugPopulateDummySpot() called; Spot: ${randomNumber}`);

        // Populate inputs 
        if (nameRef.current) nameRef.current.value = `Dummy Spot Title ${randomNumber}`;
        if (descriptionRef.current) descriptionRef.current.value = `A brief dummy ${randomNumber} description.`;
        if (addressRef.current) addressRef.current.value = `123 Dummy Street`;
        if (cityRef.current) cityRef.current.value = `Dummy City`;
        if (postalCodeRef.current) postalCodeRef.current.value = `12345`;
        // Default dummy position
        setPosition([50.0755, 14.4378]);
        // Fake Social Networks
        setSocials([
            { network: "web", label: "Web", link: "https://dummyweb.com" },
            { network: "facebook", label: "FB", link: "https://facebook.com/dummy" },
            { network: "instagram", label: "IG", link: "https://instagram.com/dummy" },
            { network: "twitter", label: "X", link: "https://twitter.com/dummy" },
            { network: "threads", label: "@", link: "https://threads.net/dummy" },
        ]);
        // Fake Tags
        setTags([
            "Food & Drinks",
            "Shops",
            "Services"
        ]);
        // Populate Upload Component with dummy images - image blobs
        try {
            const imageFiles = await Promise.all(
                ["bpvs1.png", "bpvs2.png", "bpvs3.png", "bpvs4.png", "bpvs5.png"].map(async (fileName) => {
                    const response = await fetch(`/${fileName}`); // Ensure these exist in `public/`
                    const blob = await response.blob();
                    const file = new File([blob], fileName, { type: blob.type });
    
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                })
            );
            // Do setFiles like if it was done from <UploadingImagesSpot .../>
            setFiles(imageFiles);
            console.log("Dummy images added:", imageFiles);
        } catch (error) {
            console.error("Failed to load dummy images:", error);
        }
    };

    return (
        <React.Fragment>
            <React.Fragment>
                {/* 5 Fields for input */}
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Title</Typography>
                    <TextField
                        fullWidth
                        inputRef={nameRef}
                        defaultValue={edit ? merchant?.name : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Description</Typography>
                    <TextField
                        fullWidth
                        inputRef={descriptionRef}
                        defaultValue={edit ? merchant?.description : ""}
                        multiline
                        minRows={3}
                        maxRows={5}
                    />
                </Box>
                <HrGreyCustomSeparator/>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Address</Typography>
                    <TextField
                        fullWidth
                        inputRef={addressRef}
                        defaultValue={edit ? merchant?.address.address : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">City</Typography>
                    <TextField
                        fullWidth
                        inputRef={cityRef}
                        defaultValue={edit ? merchant?.address.city : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Postal Code</Typography>
                    <TextField
                        fullWidth
                        inputRef={postalCodeRef}
                        defaultValue={edit ? merchant?.address.postalCode : ""}
                    />
                </Box>
            </React.Fragment>
            <Box mt={2}>
                {/* Map - with 🗲 Picker */}
                <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef2} style={{ height: "22vh", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker
                        position={position}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleDragEnd,
                        }}
                        icon={L.icon({ iconUrl: group13 })}
                    />
                </MapContainer>
                <div style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '18px'}}>Drag pin to more precise location</div>
            </Box>
            <HrGreyCustomSeparator marginTop={10} marginBottom={5}/>
            <Box>
                <Typography variant="h2" component="h5">Tags &nbsp; &nbsp;
                    {tagsAll.map((tag: string) => (
                        <React.Fragment key={tag}>
                            <TagMerchant tag={tag} edit={true} selected={tags.includes(tag)} actionDelegate={handleTagPressed} /> &nbsp;
                        </React.Fragment>
                    ))}
                </Typography>
            </Box>
            <HrGreyCustomSeparator marginTop={10} marginBottom={5}/>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Socials</Typography>
                {socials.map((social) => (
                    <ToggleSocialInput
                        key={social.network}
                        social={social}
                        switchLinkTo={(newLink) => handleLinkOpened(social.network, newLink)}
                    />
                ))}
            </Box>
            <HrGreyCustomSeparator marginTop={0} marginBottom={0}/>
            <Box mt={2}>
                {edit && (
                    <React.Fragment>
                        <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={keepPhotos}
                                        onChange={(e) => setKeepPhotos(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Keep photos"
                                sx={{ mr: 2 }}
                            />
                            {merchant?.images.map((url, index) => (
                                <span key={index} style={{ display: 'inline-block', width: 40, height: 40, border: '1px solid black', borderRadius: 4, marginRight: 4, overflow: 'hidden' }}>
                                    <img 
                                        src={getBackendImageUrl(url, apiBaseUrl || "")} 
                                        alt={`thumb-${index}`} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: keepPhotos ? 'none' : 'grayscale(100%)' }} 
                                    />
                                </span>
                            ))}
                        </Box>
                        <HrGreyCustomSeparator marginTop={5} marginBottom={5}/>
                    </React.Fragment>
                )}
                <UploadingImagesSpot
                    files={files}
                    setFiles={setFiles}
                    disabled={(edit) ? keepPhotos : false}
                />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                {/* Buttons at the bottom of the form */ }
                {DEBUG && (
                    <ButtonUniversal
                        title={"Populate-dummy-spot ^"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={DebugPopulateDummySpot}
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
                {/* Choose, (edit==true) - button to resave, (false) - Add button.*/}
                {edit ? (
                    <ButtonUniversal
                        title={isSaving ? "Saving ..." : "Save"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={UpdateSpot}
                        disabled={isSaving}
                    />
                ) : (
                    <ButtonUniversal
                        title={isAdding ? "Adding ..." : "Add"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={AddSpot}
                        disabled={isAdding}
                    />
                )}
            </Box>
        </React.Fragment>
    );
};

export default ModifFormSpot;
